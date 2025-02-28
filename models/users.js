// users.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true, // Keep as required
    unique: true, // Optional: enforce unique emails
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: '',
  },
  posts: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;