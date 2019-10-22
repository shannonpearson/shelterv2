import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import cns from 'classnames';
import { Button } from 'react-bootstrap';

const initialValues = {
  name: '',
  sex: '',
  breed: '',
  age: '',
  bio: '',
};

export default class PetForm extends PureComponent {
  static propTypes = {
    onSave: PropTypes.func,
    onSaveEdit: PropTypes.func,
    petToEdit: PropTypes.object,
  }

  static defaultProps = {
    onSave: () => {},
    onSaveEdit: () => {},
    petToEdit: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  componentDidMount() {
    const { petToEdit } = this.props;
    if (petToEdit && petToEdit.image) {
      this.setState({ file: petToEdit.image });
    }
  }

  handlePhotoUpload = (event) => {
    // const preview = document.querySelector('.image-preview');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // preview.src = reader.result;
      const base64String = /,(.+)/.exec(reader.result)[1]; // selects and removes everything before the first comma
      this.setState({ file: base64String });
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSave = (values, actions) => {
    const { onSave, onSaveEdit, petToEdit } = this.props;
    const { file } = this.state;
    if (petToEdit) {
      return onSaveEdit({ ...petToEdit, ...values, image: file });
    }
    actions.setSubmitting(false);
    return onSave({ ...values, image: file }).then(() => {
      actions.resetForm();
    });
  }

  render() {
    const { petToEdit } = this.props;
    const { file } = this.state;
    return (
      <Formik
        initialValues={petToEdit ? { ...petToEdit } : { ...initialValues }}
        onSubmit={this.handleSave}
        render={(props) => (
          <div className="uploader col-sm-12">
            <form>
              <label htmlFor="image-preview" className="col-sm-12">
              Upload a photo:
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  className="col-sm-4 col-sm-offset-5"
                  onChange={this.handlePhotoUpload}
                />
                {/* if new file, show file (and replace in pet) */}
                {/* if no new file and pet image, show pet image */}
                {/* else hide image */}
                {!!file && <img className={cns('image-preview')} src={`data:image/jpeg;base64,${file}`} alt="upload preview" />}
              </label>
            </form>
            <form onSubmit={props.handleSubmit}>
              <div className="input-container">
                <div className="label-text">
                Name
                </div>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.name}
                  name="name"
                  id="name"
                />
              </div>
              <div className="input-container">
                <div className="label-text">
                Sex
                </div>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.sex}
                  name="sex"
                  id="sex"
                />
              </div>
              <div className="input-container">
                <div className="label-text">
                Breed
                </div>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.breed}
                  name="breed"
                  id="breed"
                />
              </div>
              <div className="input-container">
                <div className="label-text">
                Age
                </div>
                <input
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.age}
                  name="age"
                  id="age"
                />
              </div>
              <div className="input-container">
                <div className="label-text">
                Bio
                </div>
                <textarea
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.bio}
                  name="bio"
                  id="bio"
                />
              </div>
              {props.errors.name && <div id="feedback">{props.errors.name}</div>}
              <Button variant="primary" type="submit">
              Save Changes
              </Button>
            </form>
          </div>
        )}
      />
    );
  }
}
