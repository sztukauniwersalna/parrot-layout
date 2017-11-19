import * as React from 'react';
import { render } from 'react-dom';

import Router from './Router';

require('../lib/bundle.css');

window.addEventListener('load', () => {
  render(React.createElement(Router), document.getElementById('root'));
});

