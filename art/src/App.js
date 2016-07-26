import './App.css';
import React from 'react';

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
    let perihelion = 90;
    let aphelion = 257;
    let frac = (this.state.time % 1000) / 1000;
    let theta = (2 * Math.PI) * frac;
    let cx = 300 + (Math.cos(theta) * aphelion);
    let cy = 300 + (Math.sin(theta) * perihelion);
    return (
      <div className="container">
        <svg viewBox="0 0 600 600" className="graphics">
          <rect fill="#222222" width="600" height="600" />
          <circle fill="#00D8FF" cx="300" cy="300" r="50" />
          <circle fill="#00D8FF" cx={cx} cy={cy} r="12" />
        </svg>
      </div>
    );
  }
}
