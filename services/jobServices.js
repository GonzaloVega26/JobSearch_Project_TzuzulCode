const jobModel = require("../models/jobModel");

class Job {
  async getAll() {
    try {
      const jobs = await jobModel.find();
      return jobs; // Array of Jobs
    } catch (error) {
      console.log(error);
    }
  }

  async getOneById(id) {
    try {
      const job = await jobModel.findById(id);
      return job; // Object Job
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      
        const job = await jobModel.create(data);
        return job; // Objeto
      
    } catch (error) {
      console.log(error)
      
        return {
          error: true,
          message,
        };
      }
    
  }

  async update(id, data) {
    try {
      const newJob = await jobModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return newJob; // Objeto
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const job = await jobModel.findByIdAndDelete(id);
      return job;
    } catch (error) {
      console.log(error);
    }
  }

}
 

module.exports = Job;
