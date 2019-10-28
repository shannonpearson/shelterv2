import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import cns from 'classnames';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const AdminTable = (props) => {
  const {
    tableProperties, className, onEdit, data, onDelete,
  } = props;

  const handleDelete = (id, i) => {
    if (window.confirm('Are you sure you want to delete?')) {
      return onDelete(id, i);
    }
    return null;
  };

  const _renderTableRows = () => data.map((item, i) => (
    <tr key={item._id}>
      {tableProperties.map((prop) => {
        if (prop === 'image' && item.image) {
          const image = `data:image/jpeg;base64,${item.image}`;
          return <td key={`${item._id}-${prop}`}>{image && <img src={image} width="80px" alt="thumbnail" />}</td>;
        }
        if (prop.toLowerCase().endsWith('date') || prop === 'createdOn') {
          const date = format(new Date(item[prop]), 'MMM do, yyyy h:mm aa');
          return <td key={`${item._id}-${prop}`}>{date}</td>;
        }
        return (
          <td key={`${item._id}-${prop}`}>
            {item[prop] || ''}
          </td>
        );
      })}
      <td>
        <Button className="action-button" onClick={() => onEdit(i)}><FontAwesomeIcon icon={faEdit} /></Button>
        <Button className="action-button" onClick={() => handleDelete(item._id, i)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className={cns('col-sm-12', 'admin-table-container', className)}>
      <Table bordered>
        <thead>
          <tr>
            {tableProperties
              .map((columnName) => <th key={columnName}>{columnName.toUpperCase()}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {_renderTableRows()}
        </tbody>
      </Table>
    </div>
  );
};
AdminTable.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  tableProperties: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string,
};

AdminTable.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
  tableProperties: [],
  data: [],
  className: '',
};

export default AdminTable;
