import './App.css';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {on: true};
  }

  componentDidMount() {
    this.interval = setInterval(this.onTick.bind(this), 20);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onTick() {
    this.setState({on: !this.state.on});
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
