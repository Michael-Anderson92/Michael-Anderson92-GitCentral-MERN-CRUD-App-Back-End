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
  },
  profileImg: {
    type: String,
    default: 'https://imgur.com/zC8sER6' //seaturtle deafult
  },
  bio: {
  type: String,
  default: '',
  maxLength: 400
},

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  }
});

userModel = mongoose.model('User', userSchema);
module.exports = userModel
