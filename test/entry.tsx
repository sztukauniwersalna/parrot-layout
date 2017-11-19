import * as React from 'react';
import { render } from 'react-dom';

import IsomorphicStyleContext from './IsomorphicStyleContext';

import Router from './Router';

window.addEventListener('load', () => {
  render(
    React.createElement(IsomorphicStyleContext, { children: React.createElement(Router) }),
    document.getElementById('root'),
  );
});

