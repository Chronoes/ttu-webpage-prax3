#!/usr/bin/python3
import cgi
import cgitb
import csv
import json
import pathlib
import re
from datetime import datetime

debug = True

if debug:
    cgitb.enable()


fields = [
    'dateTime',
    'username',
    'gridSize',
    'shipCount',
    'playerOneScore',
    'playerTwoScore',
    'gameTime'
]


def send_response(data):
    print('Content-Type: application/json', end='\n\n')
    print(json.dumps(data))


def send_not_found(data):
    print('Status: 404 Not Found')
    send_response(data)


def convert_results(row: dict) -> dict:
    mapped = dict(
        gridSize=int(row['gridSize']),
        shipCount=int(row['shipCount']),
        playerOneScore=int(row['playerOneScore']),
        playerTwoScore=int(row['playerTwoScore']),
        gameTime=int(row['gameTime'])
    )
    row.update(mapped)
    return row


def get_all_scores(dest: pathlib.Path) -> list:
    with dest.open('r') as f:
        return list(map(convert_results, iter(csv.DictReader(f, fieldnames=fields))))


def get_scores_by_username(username: str, dest: pathlib.Path) -> list:
    with dest.open('r') as f:
        reader = csv.DictReader(f, fieldnames=fields)
        return list(map(convert_results, (row for row in reader if row['username'] == username)))


def sort_scores(scores: list, field_to_sort: str, order: str) -> list:
    return sorted(scores, key=lambda row: row[field_to_sort], reverse=order == 'desc')


def add_score(params: cgi.FieldStorage, dest: pathlib.Path) -> dict:
    score = convert_results(dict(
        dateTime='{0:%d}.{0:%m}.{0:%Y} {0:%H}:{0:%M}:{0:%S}'.format(datetime.now()),
        username=re.sub('\W', '', params.getvalue('username')),
        gridSize=params.getvalue('gridSize'),
        shipCount=params.getvalue('shipCount'),
        playerOneScore=params.getvalue('playerOneScore'),
        playerTwoScore=params.getvalue('playerTwoScore'),
        gameTime=params.getvalue('gameTime')
    ))
    with dest.open('a') as out:
        csv.DictWriter(out, fieldnames=fields).writerow(score)
    return score


def main():
    scorefile = pathlib.Path('./scores.csv')
    params = cgi.FieldStorage()
    if 'action' in params:
        action = params.getvalue('action')
        if action == 'add':
            send_response(add_score(params, scorefile))
        elif action == 'get':
            if not scorefile.exists():
                send_not_found(dict(message='No scores available'))
            elif 'sortBy' in params and params.getvalue('sortBy') in fields:
                data = get_scores_by_username(params.getvalue('username'), scorefile) if 'username' in params else get_all_scores(scorefile)
                order = params.getvalue('order') if 'order' in params else 'asc'
                send_response(sort_scores(data, params.getvalue('sortBy'), order))
            elif 'username' in params:
                send_response(get_scores_by_username(params.getvalue('username'), scorefile))
            else:
                send_response(get_all_scores(scorefile))


if __name__ == '__main__':
    main()
