const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    maxLength: 9
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  email: {
    type: String, //verify email format
    required: true
  }, //add forums
  posts: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
    default: []
  }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

userModel = mongoose.model('User', userSchema);
module.exports = userModel
