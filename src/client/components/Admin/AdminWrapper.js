import React from 'react';
import { Button } from 'react-bootstrap';
import { logout } from '../../utils/authUtils';
import AdminTabsComponent from './AdminTabsComponent';

const AdminWrapper = () => {
  return (
    <div className="admin-wrapper">
      <div className="logout-button-container col-12">
        <Button onClick={logout}>Logout</Button>
      </div>
      <AdminTabsComponent />
    </div>
  );
};

export default AdminWrapper;
