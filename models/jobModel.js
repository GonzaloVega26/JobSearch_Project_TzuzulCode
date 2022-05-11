const {mongoose} = require('../config/db')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    salary: Number,
    details: String,
    category: [{type: String}],
    requirements : [{type: String}],
    location:String,
    employer_id: String,
    applications: [{type: String}]
  
  })

  const jobModel = mongoose.model('Job', jobSchema);

  module.exports = jobModel