const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  emergencyContacts: [{ name: String, phone: String }],
});





module.exports = mongoose.model('User', userSchema);
  