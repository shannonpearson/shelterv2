import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PetsAdminPage from './PetsAdminPage';
import EventsAdminPage from './EventsAdminPage';
import BlogAdminPage from './BlogAdminPage';

const AdminTabsComponent = () => (
  <Tabs defaultActiveKey="pets" id="admin-tabs">
    <Tab eventKey="pets" title="Pets">
      <PetsAdminPage />
    </Tab>
    <Tab eventKey="blog" title="Blog">
      <BlogAdminPage />
    </Tab>
    <Tab eventKey="events" title="Events">
      <EventsAdminPage />
    </Tab>
  </Tabs>
);

export default AdminTabsComponent;
