import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

class Login extends PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func,
  }

  static defaultProps = {
    onSuccess: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSuccess } = this.props;
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success && response.token) {
          window.localStorage.setItem('id_token', response.token);
          return onSuccess();
        }
        return this.setState({ errorMessage: 'Invalid username or password' });
      });
  }

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div className="col-xs-12 col-sm-8">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Group className="col-sm-8">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              id="username"
              type="text"
              value={username}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
              id="password"
              type="text"
              value={password}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
            ) : null}
          </Form.Group>
          <Button className="col-sm-2" type="submit">Log in</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
