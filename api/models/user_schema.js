const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema({
   _id: {
      type: mongoose.Schema.Types.ObjectId
   },

   name: {
      type: String,
      required: [true, 'name must be filled out!']
   },

   email: {
      type: String,
      unique: true,
      required: [true, 'email must be filled out!'],
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   },

   username: {
      type: String,
      unique: true,
      required: [true, 'username must be filled out!']
   },

   password: {
      type: String,
      required: [true, 'password must be filled out!']
   }
});

module.exports = mongoose.model('Users_2', userSchema);
