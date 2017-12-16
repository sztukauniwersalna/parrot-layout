import * as React from 'react';

declare var FB : FbInterface;

export interface Props {
  url : string;
  children : React.ReactNode;
}

export class FacebookSdk extends React.Component<Props, {}> {
  render() {
    const { children, url } = this.props;

    return (
      <div id='fb-root' data-url={ url }>{ children }</div>
    );
  }

  componentDidMount() {
    this.parseXfbml();
  }
  componentDidUpdate() {
    this.parseXfbml();
  }

  private parseXfbml() {
    if (FB === undefined) {
      return;
    }

    FB.XFBML.parse();
  }
}

export default FacebookSdk;

interface FbInterface {
  XFBML : Xfbml;
}

interface Xfbml {
  parse() : void;
}

function load(doc : HTMLDocument, id : string) {
  const head = doc.getElementsByTagName('head')[0] as HTMLHeadElement;
  if (doc.getElementById(id) !== null) {
    return;
  }

  const js = doc.createElement('script');
  js.id = id;
  js.src = 'https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.11';
  head.appendChild(js);
}

if (document !== undefined) {
  load(document as HTMLDocument, 'facebook-jssdk');
}

