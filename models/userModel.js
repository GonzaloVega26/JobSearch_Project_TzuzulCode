const { mongoose } = require("../config/db");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  occupation: String,
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["applicant", "employer", "admin"],
    // Applicant: person who search a job
    // Employer: person who offers a job
  },
  jobs_applicated: [{ type: String }]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
