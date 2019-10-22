import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export default class AdminTable extends PureComponent {
  static propTypes = {
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    pets: PropTypes.array,
  }

  static defaultProps = {
    onDelete: () => {},
    onEdit: () => {},
    pets: [],
  }

  handleDelete = ({ name, _id }) => {
    if (window.confirm(`Are you sure you want to delete ${name}'s profile?`)) {
      return this.props.onDelete(_id);
    }
    return null;
  }

  _renderRows() {
    const { pets = [], onEdit } = this.props;
    const petRows = [];
    pets.forEach((pet, i) => {
      const image = `data:image/jpeg;base64,${pet.image}`;
      petRows.push(
        <tr key={pet._id}>
          <td>{image && <img src={image} width="80px" alt="pet" />}</td>
          <td>{pet.name || ''}</td>
          <td>{pet.sex || ''}</td>
          <td>{pet.age || ''}</td>
          <td>{pet.breed || ''}</td>
          <td>
            <Button className="action-button" onClick={() => onEdit(i)}><FontAwesomeIcon icon={faEdit} /></Button>
            <Button className="action-button" onClick={() => this.handleDelete(pet, i)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        </tr>,
      );
    });
    return petRows;
  }

  render() {
    return (
      <div className="col-sm-12 admin-table-container">
        <Table bordered>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Breed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this._renderRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}
