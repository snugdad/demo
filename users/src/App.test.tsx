import React from 'react';
import ReactDOM from 'react-dom';
import UserGrid from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserGrid />, div);
  ReactDOM.unmountComponentAtNode(div);
});
