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
    return (
      <div className="container">
        <div className="pad" />
        <svg viewBox="0 0 50 50" className="graphics">
          <circle cx="25" cy="25" r="20" />
        </svg>
        <div className="pad" />
      </div>
    );
  }
}
