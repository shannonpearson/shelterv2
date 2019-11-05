import React, { PureComponent } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import BlogForm from './BlogForm';
import AdminTable from './AdminTable';
import { authenticatedFetch, unauthenticatedFetch } from '../../utils/fetchUtils';

export default class BlogsAdminPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      showModal: false,
      editIndex: null,
      loading: true,
    };
    this.tableProperties = ['title', 'body', 'createdOn'];
  }

  componentDidMount() {
    unauthenticatedFetch('/blogs/all').then(({ blogs }) => blogs && this.setState({ blogs, loading: false }));
  }

  handleSave = (newBlog) => authenticatedFetch('/admin/blogs', { method: 'POST', body: { blog: newBlog } })
    .then(({ success, result }) => success && result
      && this.setState((prevState) => ({
        blogs: [...prevState.blogs, result],
        showModal: false,
      })))

  handleEdit = (index) => this.setState({ showModal: true, editIndex: index });

  handleSaveEdit = (updatedBlog) => authenticatedFetch(`/admin/blogs/${updatedBlog._id}`, { method: 'PUT', body: { blog: updatedBlog } })
    .then(({ success, result }) => success && result && this.setState((prevState) => {
      const newArray = [...prevState.blogs];
      newArray.splice(prevState.editIndex, 1, result);
      return { blogs: newArray, showModal: false, editIndex: false };
    }))


  handleDelete = (id, i) => authenticatedFetch(`/admin/blogs/${id}`, { method: 'DELETE' })
    .then((success) => success && this.setState((prevState) => {
      const newArray = [...prevState.blogs];
      newArray.splice(i, 1);
      return ({
        blogs: newArray,
      });
    }))

  render() {
    const {
      showModal, blogs, editIndex, loading,
    } = this.state;

    return (
      <div className="blogs-admin-container">
        {!!loading && (
        <Spinner animation="border" role="status" className="loading-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
        )}
        <div className="row button-row">
          <Button className="new-blog-button" onClick={() => this.setState({ showModal: true })}>Create New Post</Button>
        </div>
        <div className="row">
          <AdminTable
            data={blogs}
            tableProperties={this.tableProperties}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            className="blog-admin-table"
          />
        </div>
        <Modal
          show={showModal}
          onHide={() => this.setState({ editIndex: false, showModal: false })}
          className="admin-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>{editIndex ? 'Edit Blog Entry' : 'Add New Blog Entry'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="new-blog-form">
              <BlogForm
                onSave={this.handleSave}
                onSaveEdit={this.handleSaveEdit}
                blogToEdit={editIndex !== false ? blogs[editIndex] : null}
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
