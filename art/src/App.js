import './App.css';
import React from 'react';

// Defines the ellipse for Electron and its helper functions.
const X_RADIUS = 257;
const Y_RADIUS = 90;

// In the
function pointOnEllipse(theta) {
  return {
    x: Math.cos(theta) * X_RADIUS,
    y: Math.sin(theta) * Y_RADIUS,
  };
}

// props:
// theta is an angle in radians
// blur is from 0 = no-blur to 1 = entire-oval
const Electron = (props) => {
  if (!props.blur) {
    let {x, y} = pointOnEllipse(props.theta);
    return (
      <circle fill="#00D8FF" cx={x} cy={y} r="12" />
    );
  }

  if (props.blur > 0.9999) {
    return (
      <g>
        <Electron theta={0} blur={0.6} />
        <Electron theta={Math.PI} blur={0.6} />
      </g>
    );
  }

  // The arc goes from alpha to beta
  let alpha = props.theta - (props.blur * Math.PI);
  let beta = props.theta + (props.blur * Math.PI);
  let {x: startX, y: startY} = pointOnEllipse(alpha);
  let {x: endX, y: endY} = pointOnEllipse(beta);

  let largeArc = (props.blur > 0.5) ? 1 : 0;

  let d = [
    'M',
    startX,
    startY,
    'A',
    X_RADIUS,
    Y_RADIUS,
    0,
    largeArc,
    1,
    endX,
    endY,
  ].join(' ');

  return (
    <g>
      <Electron theta={alpha} />
      <path d={d} fill="none" stroke="#00D8FF" strokeWidth="24" />
      <Electron theta={beta} />
    </g>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Time is in milliseconds
    this.state = {time: 0};
  }

  componentDidMount() {
    this.interval = setInterval(this.onTick.bind(this), 20);
    this.start = (new Date()).getTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick() {
    let time = (new Date()).getTime() - this.start;
    this.setState({time});
  }

  render() {
    // frac cycles from 0 to 1
    let period = 1000;
    let frac = (this.state.time % period) / period;

    // progress sits at 0 for a cycle, rises to 1 next cycle, sits
    // at 1 for a cycle, lowers to 0 for a cycle
    let cycleLength = 600;
    let quadFrac = (this.state.time % (cycleLength * 10)) / cycleLength;
    let progress;
    if (quadFrac <= 1) {
      progress = 0;
    } else if (quadFrac <= 5) {
      progress = (quadFrac - 1) / 4;
    } else if (quadFrac <= 6) {
      progress = 1;
    } else {
      progress = (10 - quadFrac) / 4;
    }
    progress = progress * progress;

    let theta = (2 * Math.PI) * frac;
    return (
      <div className="container">
        <svg viewBox="0 0 600 600" className="graphics">
          <rect fill="#222222" width="600" height="600" />
          <g transform="translate(300 300)">
            <circle fill="#00D8FF" cx="0" cy="0" r="50" />
            <Electron theta={theta} blur={progress} />
            <g transform="rotate(120)">
              <Electron theta={theta} blur={progress} />
            </g>
            <g transform="rotate(240)">
              <Electron theta={theta} blur={progress} />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
