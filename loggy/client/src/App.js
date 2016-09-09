import React, { Component } from 'react';

class UsernamePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = () => {
      props.onSubmit(this.state.username, this.state.password);
    };

    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
  }

  onUsernameChange(event) {
    this.setState({username: event.target.value})
  }

  onPasswordChange(password) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        username:
        <br />
        <input
          type='text'
          onChange={this.onUsernameChange}
          value={this.state.username} />
        <br />
        password:
        <br />
        <input
          type='password'
          onChange={this.onPasswordChange}
          value={this.state.password} />
        <br /><br />
        <input type='submit' value={this.props.value} />
      </form>
    );
  }
}

class App extends Component {
  render() {
    if (!this.state.username) {
      return (
        <div>
          <p>sign up with a new account:</p>
          <UsernamePasswordForm onSubmit={'TODO'} value='sign up' />
          <p>log in with an existing account:</p>
          <UsernamePasswordForm onSubmit={'TODO'} value='log in' />
        </div>
      );
    }
    return (
      <p>you are logged in as {this.state.username}</p>
    );
  }
}

export default App;
