import * as React from 'react';

export interface Props {
  url : string;
}

export function FacebookLike({ url } : Props) {
  return (
    <div
      className='fb-like'
      data-href={ url }
      data-layout='button_count'
      data-action='like'
      data-size='large'
      data-show-faces='false'
      data-share='false'
    />
  );
}

export default FacebookLike;

