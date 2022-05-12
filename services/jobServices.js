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

  async getAllWithCondition(condition) {
    try {
      const jobs = await jobModel.find(condition);
      return jobs; // Array of Jobs
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRelatedToTitle(title) {
    try {
      const jobs = await jobModel.find({
        title: { $regex: new RegExp(".*" + title + ".*"), $options: "ig" },
      });
      return jobs; // Array of Jobs
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRelatedToRequirements(requirement) {
    try {
      const jobs = await jobModel.find({ requirements: { $in: requirement } });

      return jobs;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRelatedToSalary(query) {
    console.log(query);
    try {
      if (query.comparator === "greater") {
        return await jobModel.find({ salary: { $gte: query.salary } });
      }
      if (query.comparator === "minor") {
        return await jobModel.find({ salary: { $lte: query.salary } });
      }
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
      console.log(error);

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
      console.log(newJob);
      return newJob; // Objeto
    } catch (error) {
      // console.log(error);

      return null;
    }
  }

  async delete(id) {
    try {
      const job = await jobModel.findByIdAndDelete(id);
      return job;
    } catch (error) {
      console.log(error.reason);
      console.log();
    }
  }
}
 

module.exports = Job;
