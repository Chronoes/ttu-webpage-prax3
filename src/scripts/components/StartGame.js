import React from 'react';

function StartGame({clickAction}) {
  return (
    <div className="start-game">
      <button className="btn-start-game" onClick={clickAction}>
        Start Game
      </button>
    </div>
  );
}

StartGame.displayName = 'StartGame';

export default StartGame;
