import React, { Component } from 'react';

import ColorPanel from './ColorPanel';

export default class IV extends Component {
  render() {
    return (
      <div style={{width: '100%', height: '100%', display: 'flex'}}>
        <ColorPanel initialColor="lightsalmon" />
        <ColorPanel initialColor="lightseagreen" />
      </div>
    );
  }
}