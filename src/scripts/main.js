import React from 'react';
import {render} from 'react-dom';
import App from './App';

function main() {
  render(<App />, document.getElementById('content'));
}

window.onload = main;
