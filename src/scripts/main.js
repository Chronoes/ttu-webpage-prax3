const React = require('react');
const {render} = require('react-dom');
const App = require('./App');

function main() {
  render(<App />, document.getElementById('content'));
}

window.onload = main;
