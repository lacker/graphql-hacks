import './App.css';
import React, { Component } from 'react';
import logo from './logo.png';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {on: true};
    setInterval(() => {
      this.setState({ on: !this.state.on });
    }, 1000);
  }

  render() {
    if (this.state.on) {
      return (
        {...this.props.children}
      );
    }
    return null;
  }
}

export default function App() {
  return (
    <div className="App">
      <h1>
        Welcome to <img src={logo} className="App-logo" alt="logo" /> React
      </h1>
      <p>
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
