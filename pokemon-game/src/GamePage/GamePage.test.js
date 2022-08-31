import React from 'react';
import ReactDOM from 'react-dom';
import GamePage from './GamePage';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamePage />, div);
  ReactDOM.unmountComponentAtNode(div);
});