import React, { Component } from 'react';
import chroma from 'chroma-js';

export default class V extends Component {
  constructor() {
    super();

    this.state = {
      color: '#555'
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    this.setState({
      color: chroma.hsl(
        0,
        0,
        Math.min(Math.max(event.pageY / event.target.clientHeight, 0.2), 0.8)
      )
    });
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          backgroundImage: `linear-gradient(180deg, ${chroma.hsl(
            0,
            0,
            0.05
          )}, ${chroma.hsl(0, 0, 0.95)})`,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseMove={this.handleMouseMove}
      >
        <div
          style={{
            width: '10vw',
            height: '80vh',
            alignSelf: 'center',
            backgroundColor: this.state.color
          }}
        />
      </div>
    );
  }
}
