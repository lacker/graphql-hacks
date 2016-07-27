import './App.css';
import React from 'react';

const PERIHELION = 90;
const APHELION = 257;

const Electron = (props) => {
  let cx = Math.cos(props.theta) * APHELION;
  let cy = Math.sin(props.theta) * PERIHELION;
  return (
    <circle fill="#00D8FF" cx={cx} cy={cy} r="12" />
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
    let elapsed = (new Date()).getTime() - this.start;
    this.setState({time: elapsed});
  }

  render() {
    let frac = (this.state.time % 1000) / 1000;
    let theta = (2 * Math.PI) * frac;
    return (
      <div className="container">
        <svg viewBox="0 0 600 600" className="graphics">
          <rect fill="#222222" width="600" height="600" />
          <g transform="translate(300 300)">
            <circle fill="#00D8FF" cx="0" cy="0" r="50" />
            <Electron theta={theta} />
            <g transform="rotate(120)">
              <Electron theta={theta} />
            </g>
            <g transform="rotate(240)">
              <Electron theta={theta} />
            </g>
          </g>
        </svg>
      </div>
    );
  }
}
