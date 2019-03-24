
import * as React from 'react';

const s = require('./style');

const FB_PLUGINS_SERVICE = 'https://www.facebook.com/plugins/like.php';

export interface Props {
  url : string;
}

export class FacebookLike extends React.Component<Props, {}> {
  render() {
    const { url } = this.props;

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
      <div className={ s.like }>
        <iframe
          src={ `${FB_PLUGINS_SERVICE}?${urlParamsToString(params)}` }
          scrolling='no'
        />
      </div>
    );
  }
}

export default FacebookLike;

function urlParamsToString(params : any) {
  return Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join('&')
  ;
}

