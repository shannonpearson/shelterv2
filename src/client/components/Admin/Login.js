import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { unauthenticatedFetch } from '../../utils/fetchUtils';
import { setToken } from '../../utils/authUtils';

class Login extends PureComponent {
  static propTypes = {
    onSuccess: PropTypes.func,
  };

  static defaultProps = {
    onSuccess: () => {},
  };

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
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { onSuccess } = this.props;
    return unauthenticatedFetch('/auth/login', {
      method: 'POST',
      body: { username, password },
    }).then(({ success, token, message }) => {
      if (success && token) {
        setToken(token);
        return onSuccess();
      }
      if (!success && message) {
        return this.setState({ errorMessage: `Error logging in: ${message}` });
      }
      return this.setState({ errorMessage: 'Invalid username or password' });
    });
  };

  render() {
    const { username, password, errorMessage } = this.state;
    return (
      <div className="col-12 col-sm-8">
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
              type="password"
              value={password}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
            ) : null}
          </Form.Group>
          <Button className="col-sm-2" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
