const mongoose = require('mongoose');

const distressCallSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: { lat: Number, lng: Number },
  distressType: String,
  responders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Responder' }],
  status: { type: String, enum: ['active', 'resolved'], default: 'active' },
  resolvedAt: { type: Date },
});

module.exports = mongoose.model('DistressCall', distressCallSchema);
