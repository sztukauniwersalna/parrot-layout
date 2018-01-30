import * as React from 'react';

const s = require('./style');

export interface Props {
  ratio : number;
  src : string;
  thumbnail : string;
  alt : string;
}

export type LoadingStep = 'static' | 'loading' | 'transition' | 'ready';

export interface State {
  step : LoadingStep;
}

export class Image extends React.Component<Props, State> {
  private container : HTMLDivElement;

  constructor(props : Props) {
    super(props);

    this.state = {
      step : 'static',
    };

    this.maybeStartLoading = this.maybeStartLoading.bind(this);
  }

  render() {
    const { ratio, src, alt, thumbnail } = this.props;
    const { step } = this.state;

    const height = 100 / ratio;

    return (
      <div
        className={ `image ${s.container} ${s[step]}` }
        style={ { height: `${height}vw` } }
        ref={ e => this.container = e as HTMLDivElement }
      >
        <img
          className={ s.image }
          src={ step !== 'static' ? src : '' }
          alt={ alt }
          onLoad={ () => this.setStep('transition') }
          onTransitionEnd={ () => this.setStep('ready') }
        />
        <img
          className={ s.thumbnail }
          src={ thumbnail }
          alt='thumbnail'
        />
        <noscript>
          <img src={ src } alt={ alt } />
        </noscript>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.maybeStartLoading);
    window.addEventListener('resize', this.maybeStartLoading);
    this.maybeStartLoading();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.maybeStartLoading);
    window.removeEventListener('resize', this.maybeStartLoading);
  }

  private maybeStartLoading() {
    if (this.state.step !== 'static' || !isInViewport(this.container, 128)) {
      return;
    }
    this.setStep('loading');
  }
  private setStep(step : LoadingStep) {
    this.setState(prev => ({ ...prev, step }));
  }
}

export default Image;

function isInViewport(element : HTMLElement, margin : number = 0) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight

  const upperTrigger = 0 + margin;
  const lowerTrigger = windowHeight - margin;

  return !(
    (rect.top <= upperTrigger && rect.bottom <= upperTrigger)
    || (rect.top >= lowerTrigger && rect.bottom >= lowerTrigger)
  );
}

