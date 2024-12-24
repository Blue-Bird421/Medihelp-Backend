const mongoose = require('mongoose');

const responderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  certification: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  status: { type: String, enum: ['available', 'active'], default: 'available' },
});

responderSchema.index({ location: '2dsphere' }); // Geospatial index

module.exports = mongoose.model('Responder', responderSchema);
