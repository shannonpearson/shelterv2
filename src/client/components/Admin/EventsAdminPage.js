import React, { PureComponent } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import EventForm from './EventForm';
import AdminTable from './AdminTable';
import { authenticatedFetch, unauthenticatedFetch } from '../../utils/fetchUtils';

export default class EventsAdminPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      showModal: false,
      editIndex: null,
      loading: true,
    };
    this.tableProperties = ['title', 'location', 'address', 'description', 'startDate', 'endDate'];
  }

  componentDidMount() {
    unauthenticatedFetch('/events/all').then(({ events }) => events && this.setState({ events, loading: false }));
  }

  handleSave = (newEvent) => authenticatedFetch('/admin/events', { method: 'POST', body: { event: newEvent } })
    .then(({ success, result }) => success && result
      && this.setState((prevState) => ({
        events: [...prevState.events, result],
        showModal: false,
      })))

  handleEdit = (index) => this.setState({ showModal: true, editIndex: index });

  handleSaveEdit = (updatedEvent) => authenticatedFetch(`/admin/events/${updatedEvent._id}`, { method: 'PUT', body: { event: updatedEvent } })
    .then(({ success, result }) => success && result && this.setState((prevState) => {
      const newArray = [...prevState.events];
      newArray.splice(prevState.editIndex, 1, result);
      return { events: newArray, showModal: false, editIndex: false };
    }))


  handleDelete = (id, i) => authenticatedFetch(`/admin/events/${id}`, { method: 'DELETE' })
    .then((success) => success && this.setState((prevState) => {
      const newArray = [...prevState.events];
      newArray.splice(i, 1);
      return ({
        events: newArray,
      });
    }))

  render() {
    const {
      showModal, events, editIndex, loading,
    } = this.state;
    return (
      <div className="events-admin-container">
        {!!loading && (
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
        )}
        <div className="row button-row">
          <Button className="new-event-button" onClick={() => this.setState({ showModal: true })}>Add Event</Button>
        </div>
        <div className="row">
          <AdminTable
            data={events}
            tableProperties={this.tableProperties}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            className="events-admin-table"
          />
        </div>
        <Modal
          show={showModal}
          onHide={() => this.setState({ editIndex: false, showModal: false })}
          className="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{editIndex ? 'Edit Event' : 'Add New Event'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="new-event-form">
              <EventForm
                onSave={this.handleSave}
                onSaveEdit={this.handleSaveEdit}
                eventToEdit={editIndex !== false ? events[editIndex] : null}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
            Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
