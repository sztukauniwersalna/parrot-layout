import * as React from 'react';
import * as ReactDom from 'react-dom';

const s = require('./style');

const FB_PLUGINS_SERVICE = 'https://www.facebook.com/plugins/like.php';

export interface Props {
  url : string;
}

export interface State {
  ready : boolean;
}

export class FacebookLike extends React.Component<Props, State> {
  private iframe : HTMLIFrameElement;

  constructor(props : Props) {
    super(props);

    this.state = {
      ready: false,
    };

    this.setReady = this.setReady.bind(this);
  }

  render() {
    const { url } = this.props;
    const { ready } = this.state;

    const classNames = [ s.like ];
    if (ready) {
      classNames.push(s.ready);
    }

    const params = {
      href: url,
      layout: 'button_count',
      action: 'like',
      size: 'large',
      show_faces: false,
      share: false,
      height: 21,
    };

    return (
      <div className={ classNames.join(' ') }>
        <iframe
          src={ `${FB_PLUGINS_SERVICE}?${urlParamsToString(params)}` }
          scrolling='no'
          allowTransparency={ true }
          ref={ e => this.iframe = e as HTMLIFrameElement }
        />
      </div>
    );
  }

  componentDidMount() {
    this.iframe.addEventListener('load', this.setReady);
  }
  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.setReady);
  }

  private setReady() {
    this.setState(prev => ({ ready: true }));
  }
}

export default FacebookLike;

function urlParamsToString(params : any) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  ;
}

