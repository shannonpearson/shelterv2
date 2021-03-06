import React, { PureComponent } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import AdminTable from './AdminTable';
import PetForm from './PetForm';
import { authenticatedFetch, unauthenticatedFetch } from '../../utils/fetchUtils';

export default class AdminPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      allPets: [],
      showModal: false,
      editIndex: null,
      loading: true,
    };
    this.tableProperties = ['image', 'name', 'sex', 'age', 'breed'];
  }

  componentDidMount() {
    return unauthenticatedFetch('/pets/all').then(({ pets }) => {
      this.setState({ allPets: pets, loading: false });
    });
  }

  handleSave = (newPet) => authenticatedFetch('/admin/pets', { method: 'POST', body: { pet: newPet } })
    .then(({ success, result }) => success && result
      && this.setState((prevState) => ({
        allPets: [...prevState.allPets, result],
        showModal: false,
      })))

  handleEdit = (index) => this.setState({ showModal: true, editIndex: index });

  handleSaveEdit = (updatedPet) => authenticatedFetch(`/admin/pets/${updatedPet._id}`, { method: 'PUT', body: { pet: updatedPet } })
    .then(({ success, result }) => success && result && this.setState((prevState) => {
      const newArray = [...prevState.allPets];
      newArray.splice(prevState.editIndex, 1, result);
      return { allPets: newArray, showModal: false, editIndex: false };
    }))


  handleDelete = (id, i) => authenticatedFetch(`/admin/pets/${id}`, { method: 'DELETE' })
    .then((success) => success && this.setState((prevState) => {
      const newArray = [...prevState.allPets];
      newArray.splice(i, 1);
      return ({
        allPets: newArray,
      });
    }))

  render() {
    const {
      allPets, showModal, editIndex, loading,
    } = this.state;
    return (
      <div className="admin-page-container">
        {!!loading && (
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
        )}
        <div className="row button-row">
          <Button className="new-pet-button" onClick={() => this.setState({ showModal: true })}>Add Pet</Button>
        </div>
        <div className="row">
          <AdminTable
            data={allPets}
            tableProperties={this.tableProperties}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            className="pets-admin-table"
          />
        </div>
        <Modal
          show={showModal}
          onHide={() => this.setState({ editIndex: false, showModal: false })}
          className="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{editIndex ? 'Edit Pet' : 'Add New Pet'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="new-pet-form">
              <PetForm
                onSave={this.handleSave}
                onSaveEdit={this.handleSaveEdit}
                petToEdit={editIndex !== false ? allPets[editIndex] : null}
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
