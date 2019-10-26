const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

eventSchema.statics.getAll = async function () {
  const events = await this.find({}).sort({ startDate: 1 });
  return events;
};
const Event = mongoose.model('Event', eventSchema, 'events');

module.exports = Event;
