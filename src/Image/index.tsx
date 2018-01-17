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
  constructor(props : Props) {
    super(props);

    this.state = {
      step : 'static',
    };
  }

  render() {
    const { ratio, src, alt, thumbnail } = this.props;
    const { step } = this.state;

    return (
      <div className={ `${s.container} ${s[step]}` } style={ { height: `${1 / ratio}vw` } }>
        <img
          className={ s.image }
          src={ step !== 'static' ? src : '' }
          alt={ alt }
          onLoad={ () => this.setStep('transition') }
          onTransitionEnd={ () => this.setStep('ready') }
        />
        <img className={ s.thumbnail } src={ thumbnail } alt='thumbnail' />
        <noscript>
          <img src={ src } alt={ alt } />
        </noscript>
      </div>
    );
  }

  componentDidMount() {
    this.setStep('loading');
  }

  private setStep(step : LoadingStep) {
    this.setState(prev => ({ ...prev, step }));
  }
}

export default Image;

