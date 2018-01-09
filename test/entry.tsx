import * as React from 'react';
import { render } from 'react-dom';

import IsomorphicStyleContext from './IsomorphicStyleContext';

import Router from './Router';

function initialize() {
  const container = document.getElementById('root') as HTMLDivElement;
  const router = React.createElement(Router);
  const context = React.createElement(IsomorphicStyleContext, {}, router);
  render(context, container);
}

if (document.readyState === 'complete') {
  initialize();
} else {
  window.addEventListener('load', initialize);
}

