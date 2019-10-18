import React, { PureComponent } from 'react';
import Login from './Login';


export default class AdminContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication = () => {
    const token = window.localStorage.getItem('id_token');

    if (token) {
      return fetch('/api/admin/access', { method: 'GET', headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.json())
        .then((response) => {
          if (response.success) {
            return this.setState({ isAuthenticated: true });
          }
          return null;
        });
    }
    return null;
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className="container admin-container">
        {isAuthenticated ? <div className="authenticated-placeholder" /> : <Login onSuccess={this.checkAuthentication} />}
      </div>
    );
  }
}
