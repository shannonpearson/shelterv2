import React from 'react';
import { Button } from 'react-bootstrap';
import { logout } from '../../utils/authUtils';
import AdminTabsComponent from './AdminTabsComponent';

const AdminWrapper = () => {
  return (
    <div className="admin-wrapper">
      <Button onClick={logout}>Logout</Button>
      <AdminTabsComponent />
    </div>
  );
};

export default AdminWrapper;
