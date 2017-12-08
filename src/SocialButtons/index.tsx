import * as React from 'react';

import Button from '../Button';
import Icon from '../Icon';

const s = require('./style');

export function SocialButtons() {
  return (
    <ul className={ s.socialButtons }>
      <li key='facebook'>
        <Button
          variant='action'
          color='green'
          url='https://www.facebook.com/sztukauniwersalna/'
        >
          <Icon name='facebook' />
        </Button>
      </li>
      <li key='instagram'>
        <Button
          variant='action'
          color='green'
          url='https://www.instagram.com/sztuka_uniwersalna/'
        >
          <Icon name='instagram' />
        </Button>
      </li>
    </ul>
  );
}

export default SocialButtons;

