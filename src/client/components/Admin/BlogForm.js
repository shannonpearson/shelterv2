import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import RichTextEditor from 'react-rte';


import { Button } from 'react-bootstrap';

const initialValues = {
  title: '',
};

export default class BlogForm extends PureComponent {
  static propTypes = {
    onSaveEdit: PropTypes.func,
    onSave: PropTypes.func,
    blogToEdit: PropTypes.object,
  }

  static defaultProps = {
    onSaveEdit: () => {},
    onSave: () => {},
    blogToEdit: null,
  }

  constructor(props) {
    super(props);
    const richTextBody = props.blogToEdit && props.blogToEdit.body ? RichTextEditor.createValueFromString(props.blogToEdit.body, 'html') : RichTextEditor.createEmptyValue();
    this.state = {
      body: richTextBody,
    };
  }

  onRTEChange = (body) => {
    this.setState({ body });
    // if (this.props.onChange) {
    //   // Send the changes up to the parent component as an HTML string.
    //   // This is here to demonstrate using `.toString()` but in a real app it
    //   // would be better to avoid generating a string on each change.
    //   this.props.onChange(
    //     value.toString('html'),
    //   );
    // }
  };

  handleSubmit = (values, actions) => {
    const { onSave, onSaveEdit, blogToEdit } = this.props;
    const { body } = this.state;
    const blogObject = { ...values, body: body.toString('html') };
    console.log(blogObject);
    if (blogToEdit) {
      return onSaveEdit({ ...blogObject }).then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
    }
    return onSave(blogObject).then(() => {
      actions.setSubmitting(false);
      actions.resetForm();
    });
  }

  render() {
    const { blogToEdit } = this.props;

    return (
      <Formik
        initialValues={blogToEdit ? { ...blogToEdit } : { ...initialValues }}
        onSubmit={this.handleSubmit}
        render={(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="label-text">
              Title
            </div>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.title}
              name="title"
            />
            <div className="label-text">
              Post Body
            </div>
            <RichTextEditor
              value={this.state.body}
              onChange={this.onRTEChange}
            />
            <div className="row button-row">
              <Button variant="primary" type="submit">
              Save Changes
              </Button>
            </div>
          </form>
        )}
      />
    );
  }
}
