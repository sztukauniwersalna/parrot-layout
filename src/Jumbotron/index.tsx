import * as React from 'react';
import { ReactNode } from 'react';

import { Page, Tag, Website } from 'paramorph/models';
import SocialButtons from '../SocialButtons';

const s = require('./style');

export type Align = 'center' | 'bottom';

export interface Props {
  children ?: ReactNode;
  fullscreen ?: boolean;
  align ?: Align;
}

export function Jumbotron({ children, fullscreen = false, align = 'center' } : Props) {
  return (
    <div className={ `${s.container} ${fullscreen ? s.fullscreen : ''} ${s[align]}` }>
      <div className={ `${s.jumbo} contrast compact non-responsive strong` }>
        <div className={ `${s.text} ${align === 'center' ? 'centered' : ''}` }>
          <div className='text'>
            { children }
          </div>
        </div>
        <div className='image' />
      </div>
      <div className={ s.footer }>
        <div className={ s.social }>
          <SocialButtons />
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;

