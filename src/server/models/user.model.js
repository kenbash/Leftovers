const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 1 },
  password: { type: String, required: true, minlength: 1 }
});

module.exports = mongoose.model('User', UserSchema);
