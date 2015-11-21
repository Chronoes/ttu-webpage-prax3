import React from 'react';

function StartGame(props) {
  return (
    <div className="start-game">
      <button className="btn-start-game" onClick={props.clickAction}>
        Start Game
      </button>
    </div>
  );
}

StartGame.displayName = 'StartGame';

module.exports = StartGame;
