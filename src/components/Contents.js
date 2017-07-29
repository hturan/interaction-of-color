import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

const listStyle = {
  listStyle: 'none',
  padding: 0
};

const linkStyle = {
  color: '#666',
  fontSize: '3vw',
  lineHeight: '6vw',
  textDecoration: 'none'
};

export default props =>
  <div style={{ paddingLeft: '50px' }}>
    <h1 style={{ fontSize: '3vw', fontWeight: 400, margin: 0, paddingTop: '50px' }}>
      Interaction of Color
    </h1>

    <ul style={listStyle}>
      <li>
        <Link style={linkStyle} to="/iv">
          IV — The relativity of color
        </Link>
      </li>
      <li>
        <Link style={linkStyle} to="/v">
          V — Light intensity, lightness
        </Link>
      </li>
    </ul>

    <IntensityAnimation baseColor="red" />
  </div>;

// const reds = [
//   chroma.hsl(8, 0.78, 0.69),
//   chroma.hsl(9, 0.75, 0.55),
//   chroma.hsl(356, 0.7, 0.61),
//   chroma.hsl(357, 0.65, 0.45),
//   chroma.hsl(357, 0.72, 0.72),
//   chroma.hsl(351, 0.42, 0.52),
//   chroma.hsl(9, 0.78, 0.56),
//   chroma.hsl(344, 0.69, 0.43)
// ];

const generateHue = baseColor => {
  const baseHue = chroma(baseColor).hsl()[0];
  return (baseHue + 10 - Math.ceil(Math.random() * 20)) % 359;
};

class IntensityAnimation extends Component {
  constructor(props) {
    super();

    this.colors = [];

    const max = 0.7;
    const min = 0.45;

    for (let i = 0; i < 30; i++) {
      this.colors.push({
        color: chroma.hsl(
          generateHue(props.baseColor),
          Math.random() * (max - min) + min,
          Math.random() * (max - min) + min
        ),
        zIndex: Math.floor(Math.random() * 10)
      });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.forceUpdate(), 9000);

    setTimeout(() => this.forceUpdate(), 0);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          top: 0,
          right: 0,
          left: '50%',
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {this.colors.map(({ color, zIndex }, index) =>
          <div
            key={index}
            style={{
              display: 'inline-block',
              height: '5vw',
              width: '70%',
              position: 'relative',
              top: 0,
              zIndex,
              backgroundColor: color,
              transform: `rotate(${10 * Math.random() - 5}deg) translate(${100 *
                Math.random()}px, ${60 * Math.random() - 20}px)`,
              transition: 'transform 8s'
            }}
          />
        )}
      </div>
    );
  }
}
