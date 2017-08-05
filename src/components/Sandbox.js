import React, { Component } from 'react';
import chroma from 'chroma-js';

const clamp = (value, min, max) => {
  return Math.max(Math.min(value, max), min);
};

const stopPropagation = event => event.stopPropagation();

const HSLInput = ({ handleAxisChange, ...props }) =>
  <label
    style={{ marginRight: 5, fontStyle: 'italic' }}
    onClick={stopPropagation}
  >
    <input type="radio" onChange={handleAxisChange} {...props} />
    <span style={{ marginLeft: 3 }}>
      {props.value.charAt(0).toUpperCase() + props.value.slice(1)}
    </span>
  </label>;

export default class Sandbox extends Component {
  constructor() {
    super();

    this.state = {
      xAxis: 'saturation',
      yAxis: 'lightness',
      scroll: 'hue',
      hue: 0,
      saturation: 0.5,
      lightness: 0.9,
      palette: []
    };

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleAxisChange = this.handleAxisChange.bind(this);
    this.handleWindowScroll = this.handleWindowScroll.bind(this);
    this.handleForceTouch = this.handleForceTouch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Force Touch
    // this.container.addEventListener('webkitmouseforcechanged', this.handleForceTouch);

    // Scroll
    window.addEventListener('scroll', this.handleWindowScroll);
  }

  componentWillUnmount() {
    // Force Touch
    // this.container.removeEventListener('webkitmouseforcechanged', this.handleForceTouch);

    // Scroll
    window.removeEventListener('scroll', this.handleWindowScroll);
  }

  handleForceTouch(event) {
    const force = event.webkitForce - event.WEBKIT_FORCE_AT_MOUSE_DOWN;

    this.setState({
      hue: force / event.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN * 360
    });
  }

  handleWindowScroll(event) {
    const scrollDelta = window.scrollY;

    let value;

    switch (this.state.scroll) {
      case 'hue':
        value = (this.state.hue + scrollDelta) % 359;
        break;
      case 'saturation':
        value = clamp(this.state.saturation + scrollDelta / 1000, 0, 1);
        break;
      case 'lightness':
        value = clamp(this.state.lightness + scrollDelta / 1000, 0, 1);
        break;
    }

    this.setState({
      [this.state.scroll]: value
    });
  }

  handleMouseMove(event) {
    const x = event.pageX / document.body.clientWidth;
    const y = event.pageY / document.body.clientHeight;

    const { xAxis, yAxis } = this.state;

    let xValue, yValue;

    switch (xAxis) {
      case 'hue':
        xValue = x * 360;
        break;
      case 'saturation':
        xValue = x;
        break;
      case 'lightness':
        xValue = x;
        break;
    }

    switch (yAxis) {
      case 'hue':
        yValue = y * 360;
        break;
      case 'saturation':
        yValue = y;
        break;
      case 'lightness':
        yValue = 1 - y;
        break;
    }

    this.setState({
      [xAxis]: xValue,
      [yAxis]: yValue
    });
  }

  handleAxisChange(event) {
    const { name: axis, value } = event.target;

    const existingControl = Object.keys(this.state).find(
      key => this.state[key] === value
    );
    const currentValue = this.state[axis];

    this.setState({
      [existingControl]: currentValue,
      [axis]: value
    });
  }

  handleClick() {
    const { palette, hue, saturation, lightness } = this.state;
    this.setState({
      palette: [...palette, [hue, saturation, lightness]]
    });
  }

  render() {
    const { hue, saturation, lightness, xAxis, yAxis, scroll } = this.state;

    return (
      <div
        ref={ref => (this.container = ref)}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: chroma.hsl(hue, saturation, lightness)
        }}
        onMouseMove={this.handleMouseMove}
        onClick={this.handleClick}
      >
        <div
          onMouseMove={this.handleMouseMove}
          style={{
            color: chroma.hsl(hue, saturation, 1 - lightness),
            textAlign: 'right',
            position: 'absolute',
            right: 40,
            top: 20
          }}
        >
          <h2
            style={{
              fontWeight: 'normal',
              marginBottom: 10
            }}
          >
            x-axis
          </h2>
          <HSLInput
            name="xAxis"
            value="hue"
            checked={xAxis === 'hue'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="xAxis"
            value="saturation"
            checked={xAxis === 'saturation'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="xAxis"
            value="lightness"
            checked={xAxis === 'lightness'}
            onChange={this.handleAxisChange}
          />

          <h2
            style={{
              fontWeight: 'normal',
              marginBottom: 10
            }}
          >
            y-axis
          </h2>
          <HSLInput
            name="yAxis"
            value="hue"
            checked={yAxis === 'hue'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="yAxis"
            value="saturation"
            checked={yAxis === 'saturation'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="yAxis"
            value="lightness"
            checked={yAxis === 'lightness'}
            onChange={this.handleAxisChange}
          />

          <h2
            style={{
              fontWeight: 'normal',
              marginBottom: 10
            }}
          >
            scroll
          </h2>
          <HSLInput
            name="scroll"
            value="hue"
            checked={scroll === 'hue'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="scroll"
            value="saturation"
            checked={scroll === 'saturation'}
            onChange={this.handleAxisChange}
          />
          <HSLInput
            name="scroll"
            value="lightness"
            checked={scroll === 'lightness'}
            onChange={this.handleAxisChange}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            right: 40,
            bottom: 20
          }}
        >
          {this.state.palette.map(hsl =>
            <div
              title={`hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`}
              style={{
                display: 'inline-block',
                padding: 12,
                marginLeft: 5,
                backgroundColor: chroma.hsl(...hsl),
                border: '2px solid white'
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
