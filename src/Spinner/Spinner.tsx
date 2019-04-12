
import * as React from 'react';

const s = require('./style');

export function Spinner() {
  return (
    <span className={ s.spinner }>
      <div><i/><i/><i/><i/></div>
    </span>
  );
}

export default Spinner;

