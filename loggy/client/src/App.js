import React, { Component } from 'react';

// Returns a promise that resolves with data on success, or
// rejects with error on failure.
function runGraphQL(query, variables) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function() {
      if (xhr.response.data) {
        resolve(xhr.response.data);
      } else {
        reject(xhr.response.error);
      }
    }
    xhr.send(JSON.stringify({query: query, variables: variables}));
  });
}

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
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  signup(username, password) {
    runGraphQL(`{
      signup(username: $username, password: $password)
    }`, {
      username,
      password
    }).then((response) => {
      this.setState({username});
    }).catch((error) => {
      console.log('error in signup:', error);
    });
  }

  login(username, password) {
    runGraphQL(`{
      login(username: $username, password: $password)
    }`, {
      username,
      password
    }).then((response) => {
      this.setState({username});
    }).catch((error) => {
      console.log('error in login');
    });
  }

  render() {
    if (!this.state.username) {
      return (
        <div>
          <p>sign up with a new account:</p>
          <UsernamePasswordForm onSubmit={this.signup} value='sign up' />
          <p>log in with an existing account:</p>
          <UsernamePasswordForm onSubmit={this.login} value='log in' />
        </div>
      );
    }
    return (
      <p>you are logged in as {this.state.username}</p>
    );
  }
}

export default App;
