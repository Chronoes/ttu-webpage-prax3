import React from 'react';

const Navbar = ({current, routeAction}) => (
  <nav className="navbar navbar-light bg-success">
    <ul className="nav navbar-nav nav-pills">
      <li className={'nav-item' + (current === '/' ? ' active' : '')}>
        <a className="nav-link" href="/" onClick={routeAction}>Game</a>
      </li>
      <li className={'nav-item' + (current === '/scores' ? ' active' : '')}>
        <a className="nav-link" href="/scores" onClick={routeAction}>Highscores</a>
      </li>
    </ul>
  </nav>
);

Navbar.displayName = 'Navbar';

export default Navbar;
