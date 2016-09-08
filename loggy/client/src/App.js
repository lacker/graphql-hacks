import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Content extends Component {
  render() {
    if (this.props.username) {
      return (
        <p>logged in as: {this.props.username}</p>
      );
    } else {
      return (
        <p>you need to log in!</p>
      );
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
