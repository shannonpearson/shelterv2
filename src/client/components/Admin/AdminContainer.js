import React, { PureComponent } from 'react';
import Login from './Login';
import AdminPage from './AdminPage';
import authenticatedFetch from '../../fetchUtils/authenticatedFetch';


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

  checkAuthentication = () => authenticatedFetch('/admin/access')
    .then(({ success }) => success && this.setState({ isAuthenticated: true }))

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className="container admin-container">
        {isAuthenticated ? <AdminPage /> : <Login onSuccess={this.checkAuthentication} />}
      </div>
    );
  }
}
