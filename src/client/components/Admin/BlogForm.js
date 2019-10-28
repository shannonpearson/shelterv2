import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import RichTextEditor from 'react-rte';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { uploadPhoto } from '../../utils/imageUploadUtils';

const initialValues = {
  title: '',
};

const BlogForm = (props) => {
  const { onSave, onSaveEdit, blogToEdit } = props;
  const richTextBody = blogToEdit && blogToEdit.body ? RichTextEditor.createValueFromString(blogToEdit.body, 'html') : RichTextEditor.createEmptyValue();

  const [body, setBody] = useState(richTextBody);
  const [files, setFiles] = useState((blogToEdit && blogToEdit.files) || []);


  const onRTEChange = (value) => setBody(value);

  const handleSubmit = (values, actions) => {
    const blogObject = { ...values, body: body.toString('html') };

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
  };

  const removeFile = (index) => {
    const filesList = [...files];
    filesList.splice(index, 1);
    return setFiles(filesList);
  };

  const addFile = (file) => {
    const filesList = [...files];
    filesList.push(file);
    return setFiles(filesList);
  };

  const handlePhotoChange = (event) => uploadPhoto(event, (file) => addFile(file));

  return (
    <Formik
      initialValues={blogToEdit ? { ...blogToEdit } : { ...initialValues }}
      onSubmit={handleSubmit}
      render={(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <div className="label-text">
              Title
          </div>
          <input
            type="text"
            onChange={formProps.handleChange}
            onBlur={formProps.handleBlur}
            value={formProps.values.title}
            name="title"
          />
          <div className="label-text">
              Post Body
          </div>
          <RichTextEditor
            value={body}
            onChange={onRTEChange}
          />
          <div className="multiple-file-uploader">
            <div className="files-preview-display">
              {files.map((file, i) => (
                <div key={file.slice(0, 10)} className="blog-image-preview-container">
                  <img className="blog-image-preview" src={`data:image/jpeg;base64,${file}`} alt="upload preview" />
                  <Button className="delete-button" onClick={() => removeFile(i)}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
              ))}
            </div>
            <div className="file-input-container">
              <input
                type="file"
                id="blogFileUploader"
                name="blogFileUploader"
                accept="image/*"
                className="blog-image-uploader"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <div className="row button-row">
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      )}
    />
  );
};

BlogForm.propTypes = {
  onSaveEdit: PropTypes.func,
  onSave: PropTypes.func,
  blogToEdit: PropTypes.object,
};

BlogForm.defaultProps = {
  onSaveEdit: () => {},
  onSave: () => {},
  blogToEdit: null,
};

export default BlogForm;

// export default class BlogForm extends PureComponent {
//   static propTypes = {
//     onSaveEdit: PropTypes.func,
//     onSave: PropTypes.func,
//     blogToEdit: PropTypes.object,
//   }

//   static defaultProps = {
//     onSaveEdit: () => {},
//     onSave: () => {},
//     blogToEdit: null,
//   }

//   constructor(props) {
//     super(props);
//     const richTextBody = props.blogToEdit && props.blogToEdit.body ? RichTextEditor.createValueFromString(props.blogToEdit.body, 'html') : RichTextEditor.createEmptyValue();
//     this.state = {
//       body: richTextBody,
//     };
//   }

//   onRTEChange = (body) => this.setState({ body });

//   handleSubmit = (values, actions) => {
//     const { onSave, onSaveEdit, blogToEdit } = this.props;
//     const { body } = this.state;
//     const blogObject = { ...values, body: body.toString('html') };

//     if (blogToEdit) {
//       return onSaveEdit({ ...blogObject }).then(() => {
//         actions.setSubmitting(false);
//         actions.resetForm();
//       });
//     }
//     return onSave(blogObject).then(() => {
//       actions.setSubmitting(false);
//       actions.resetForm();
//     });
//   }

//   render() {
//     const { blogToEdit } = this.props;

//     return (
//       <Formik
//         initialValues={blogToEdit ? { ...blogToEdit } : { ...initialValues }}
//         onSubmit={this.handleSubmit}
//         render={(props) => (
//           <form onSubmit={props.handleSubmit}>
//             <div className="label-text">
//               Title
//             </div>
//             <input
//               type="text"
//               onChange={props.handleChange}
//               onBlur={props.handleBlur}
//               value={props.values.title}
//               name="title"
//             />
//             <div className="label-text">
//               Post Body
//             </div>
//             <RichTextEditor
//               value={this.state.body}
//               onChange={this.onRTEChange}
//             />
//             <MultipleFileUpload />
//             <div className="row button-row">
//               <Button variant="primary" type="submit">
//               Save Changes
//               </Button>
//             </div>
//           </form>
//         )}
//       />
//     );
//   }
// }
