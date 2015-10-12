// require('jquery');
var React = require('react');
var render = require('react-dom').render;
var App = require('./App');

function main() {
  render(React.createElement(App), document.getElementById('content'));
}

window.onload = main;
