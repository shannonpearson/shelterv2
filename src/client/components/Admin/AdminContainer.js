import React, { PureComponent } from 'react';
import { Spinner } from 'react-bootstrap';
import Login from './Login';
import AdminWrapper from './AdminWrapper';
import { authenticatedFetch } from '../../utils/fetchUtils';

export default class AdminContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  checkAuthentication = () =>
    authenticatedFetch('/admin/access')
      .then(({ success }) =>
        this.setState({ isAuthenticated: !!success, loading: false })
      )
      .catch(() => this.setState({ loading: false }));

  render() {
    const { isAuthenticated, loading } = this.state;
    return (
      <div className="container admin-container">
        {!!loading && (
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        {!loading &&
          (isAuthenticated ? (
            <AdminWrapper />
          ) : (
            <Login onSuccess={this.checkAuthentication} />
          ))}
      </div>
    );
  }
}
