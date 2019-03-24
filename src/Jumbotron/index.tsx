
import * as React from 'react';
import { PureComponent } from 'paramorph';

import SocialButtons from '../SocialButtons';

const s = require('./style');

export type Align = 'center' | 'bottom';

export interface Props {
  fullscreen ?: boolean;
  align ?: Align;
}

export class Jumbotron extends PureComponent<Props, {}> {
  render() {
    const { children, fullscreen = false, align = 'center' } = this.props;

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
}

export default Jumbotron;

