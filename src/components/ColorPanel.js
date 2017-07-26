import React, { Component } from 'react';
import chroma from 'chroma-js';

class ColorPanel extends Component {
  constructor(props) {
    super();

    this.state = {
      color: props.initialColor
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event) {
    const horizontalRatio = (event.pageX - this.element.offsetLeft) / this.element.clientWidth;
    const verticalRatio = (event.pageY - this.element.offsetTop) / this.element.clientHeight;

    this.setState({
      color: chroma.hsl((horizontalRatio * 360), 1, (1 - verticalRatio))
    });
  }

  render() {
    const {children} = this.props;
    const {color} = this.state;

    return (
      <div ref={ref => this.element = ref} onMouseMove={this.handleMouseMove} style={{backgroundColor: color, display: 'flex', flexGrow: '1', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{width: '25%', height: '200px', backgroundColor: 'navy'}} />
      </div>
    );
  }
}

export default ColorPanel;