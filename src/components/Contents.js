import React from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

const listStyle = {
  listStyle: 'none',
  padding: 0
};

const linkStyle = {
  color: '#666',
  fontSize: '30px',
  lineHeight: '70px',
  textDecoration: 'none'
};

export default props =>
  <div style={{ paddingLeft: '50px' }}>
    <h1 style={{ fontWeight: 400, margin: 0, paddingTop: '50px' }}>
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

    <IntensityAnimation baseColor="blue" />
  </div>;

const reds = [
  chroma.hsl(8, 0.78, 0.69),
  chroma.hsl(9, 0.75, 0.55),
  chroma.hsl(356, 0.7, 0.61),
  chroma.hsl(357, 0.65, 0.45),
  chroma.hsl(357, 0.72, 0.72),
  chroma.hsl(351, 0.42, 0.52),
  chroma.hsl(9, 0.78, 0.56),
  chroma.hsl(344, 0.69, 0.43)
];

const IntensityAnimation = ({ baseColor }) =>
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      left: '50%',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    {reds.map((color, index) =>
      <div
        style={{
          display: 'inline-block',
          height: '70px',
          width: '70%',
          position: 'relative',
          zIndex: Math.floor(Math.random() * 10),
          marginTop: 40 * Math.random() - 20,
          marginLeft: 100 * Math.random(),
          backgroundColor: color,
          transform: `rotate(${10 * Math.random() - 5}deg)`
        }}
      />
    )}
  </div>;
