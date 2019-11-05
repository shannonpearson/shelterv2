import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';

import { Button } from 'react-bootstrap';

const initialValues = {
  title: '',
  description: '',
  location: '',
  address: '',
};

export default class EventForm extends PureComponent {
  static propTypes = {
    onSaveEdit: PropTypes.func,
    onSave: PropTypes.func,
    eventToEdit: PropTypes.object,
  }

  static defaultProps = {
    onSaveEdit: () => {},
    onSave: () => {},
    eventToEdit: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      startDate: props.eventToEdit && props.eventToEdit.startDate
        ? new Date(props.eventToEdit.startDate)
        : null,
      endDate: props.eventToEdit && props.eventToEdit.endDate
        ? new Date(props.eventToEdit.endDate)
        : null,
    };
  }

  handleChangeDate = (type) => (date) => {
    this.setState({
      [`${type}Date`]: date,
    });
  }

  handleSubmit = (values, actions) => {
    const { onSave, onSaveEdit, eventToEdit } = this.props;
    const { startDate, endDate } = this.state;
    const eventObject = { ...values, startDate, endDate };
    console.log(eventObject);
    if (eventToEdit) {
      return onSaveEdit({ ...eventObject }).then(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
    }
    return onSave(eventObject).then(() => {
      actions.setSubmitting(false);
      actions.resetForm();
    });
  }

  render() {
    const { eventToEdit } = this.props;
    return (
      <Formik
        initialValues={eventToEdit ? { ...eventToEdit } : { ...initialValues }}
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
              Location (name)
            </div>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.location}
              name="location"
            />
            <div className="label-text">
              Address
            </div>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.address}
              name="address"
            />
            <div className="label-text">
                Description
            </div>
            <textarea
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.description}
              name="description"
            />
            <div className="label-text">
              Start Time
            </div>
            <div className="input-container" />
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChangeDate('start')}
              showTimeSelect
            />
            <div className="label-text">
                End Time (optional)
            </div>
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleChangeDate('end')}
              showTimeSelect
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
