import './App.css';
import React, { Component } from 'react';

export default class App extends Component {
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
    if (this.state.on) {
      return (<p>Hello world</p>);
    } else {
      return null;
    }
  }
}
