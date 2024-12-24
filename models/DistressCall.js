const mongoose = require('mongoose');


const distressCallSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    responders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Responder' }],
    resolvedAt: { type: Date },
    userInfo: {
      profilePhoto: String,
      name: String,
      phone: String,
      additionalData: {
        email: String,
        age: Number,
        gender: String,
        bloodType: String,
        emergencyContact: String,
        medicalHistory: String,
      }
    },
    location: { 
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true } 
    },
    distressType: String
});

module.exports = mongoose.model('DistressCall', distressCallSchema);


