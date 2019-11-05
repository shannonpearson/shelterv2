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

  function _renderTableRows() {
    return data.map((item, i) => (
      <tr key={item._id}>
        {tableProperties.map((prop) => {
          let content;
          if (prop === 'image' && item[prop]) {
            const image = `data:image/jpeg;base64,${item.image}`;
            content = <img src={image} width="80px" alt="thumbnail" />;
          } else if ((prop.toLowerCase().endsWith('date') || prop === 'createdOn') && item[prop]) {
            const date = format(new Date(item[prop]), 'MMM do, yyyy h:mm aa');
            content = date;
          } else if (item[prop][0] === '<') {
            content = <div className="html-content" dangerouslySetInnerHTML={{ __html: item[prop] }} />;
          } else {
            content = item[prop];
          }
          return (
            <td key={`${item._id}-${prop}`}>
              <div className="table-content">
                {content || ''}
              </div>
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
  }

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
