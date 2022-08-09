const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  start: {type: Date, required: true},
  end: {type: Date, required: true},
  allDay: {type: Boolean, default: false},
  name: {type: String, required: true}
});

module.exports = mongoose.model('Events', eventsSchema);