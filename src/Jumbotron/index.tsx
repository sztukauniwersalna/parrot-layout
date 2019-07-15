
import * as React from 'react';
import { PureComponent } from 'paramorph';

import SocialButtons from '../SocialButtons';

const s = require('./style');

export type Align = 'center' | 'bottom';

export interface Props {
  fullscreen ?: boolean;
  align ?: Align;
}
export interface State {
  animation : boolean;
  imageLoaded : boolean;
}

export class Jumbotron extends PureComponent<Props, State> {
  private image : HTMLDivElement | null;
  private loader = new Image();

  constructor(props : Props) {
    super(props);

    this.state = {
      animation: true,
      imageLoaded: false,
    };

    this.onImageLoaded = this.onImageLoaded.bind(this);
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
  }

  render() {
    const { children, fullscreen = false, align = 'center' } = this.props;
    const { imageLoaded, animation } = this.state;

    const classNames = [ s.container, s[align] ];
    if (fullscreen) {
      classNames.push(s.fullscreen);
    }
    if (imageLoaded) {
      classNames.push('loaded');
    }
    if (animation) {
      classNames.push('animation');
    }

    return (
      <div className={ classNames.join(' ') }>
        <div className={ `${s.jumbo} contrast compact non-responsive strong` }>
          <div className={ `${s.text} ${align === 'center' ? 'centered' : ''}` }>
            <div className='text' onAnimationEnd={ this.onAnimationEnd }>
              { children }
            </div>
          </div>

          <div className='image' ref={ e => this.image = e } />
        </div>

        <div className={ s.footer }>
          <div className={ s.social }>
            <SocialButtons />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { image, loader } = this;
    loader.addEventListener('load', this.onImageLoaded);

    if (!image) {
      return;
    }
    const style = window.getComputedStyle(image, "::before");
    if (!style) {
      return;
    }
    const backgroundImage = style.getPropertyValue('background-image');
    if (!backgroundImage) {
      return;
    }
    const url = backgroundImage.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    loader.src = url;
  }
  componentWillUnmount() {
    const { loader } = this;
    loader.removeEventListener('load', this.onImageLoaded);
  }

  private onImageLoaded() {
    this.setState(prev => ({ ...prev, imageLoaded: true }));
    this.loader.src = '';
  }

  private onAnimationEnd() {
    this.setState(prev => ({ ...prev, animation: false }));
  }
}

export default Jumbotron;

