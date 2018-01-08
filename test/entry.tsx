import * as React from 'react';
import { render } from 'react-dom';

import IsomorphicStyleContext from './IsomorphicStyleContext';

import Router from './Router';

function initialize() {
  const container = document.getElementById('root') as HTMLDivElement;
  container.innerHTML = '';

  const router = React.createElement(Router);
  const styleContext = React.createElement(IsomorphicStyleContext, {}, router);
  render(styleContext, container);
}

if (document.readyState === 'complete') {
  initialize();
} else {
  window.addEventListener('load', initialize);
}

