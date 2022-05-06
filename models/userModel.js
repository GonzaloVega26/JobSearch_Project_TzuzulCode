const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    username: {
      type: String,
      unique: [true, "The Username is already in use"]
    },
    email: {
      type: String,
      required: true,
      unique: [true, "The Email is already in use"]
    },
    age: Number,
    occupation: String,
    password : {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "user"
    }
  })

  const userModel = mongoose.model('User', userSchema);

  module.exports = userModel