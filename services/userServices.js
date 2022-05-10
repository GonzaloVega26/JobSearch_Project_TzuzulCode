const userModel = require("../models/userModel");

class User {
  async getAll() {
    try {
      const users = await userModel.find();
      return users; // Array of Users
    } catch (error) {
      console.log(error);
    }
  }

  async getOneByEmail(email) {
    try {
      const user = await userModel.findOne({email});
     
      return user; 
    } catch (error) {
      console.log(error);
    }
  }

  async getOneById(id){
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async create(data) {
    try {
      if (validate) {
        const user = await userModel.create(data);
        return user; // Objeto
      }
    } catch (error) {
      console.log(error)
      
      if (error.code === 11000) {
        const keyValues = error.keyValue
        const message = []

        for (const property in keyValues) {
          message.push(`The ${property}: ${keyValues[property]} is already in use`)
        }
        return {
          error: true,
          message,
        };
      }
    }
  }

  async update(id, data) {
    try {
      const newUser = await userModel.findByIdAndUpdate(id, data, {
        new: true,
      });

      return newUser; // Objeto
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const user = await userModel.findByIdAndDelete(id);
      
      return user;
    } catch (error) {
      console.log(error);
    }
  }


  async searchByField(fields){
    try {
      
      const rawData = await userModel.find(fields)
      const users = []
      rawData.forEach(user =>{
        const {name,email,age,occupation} = user
        users.push({name,email,age,occupation})
      })
      return users
    } catch (error) {
      console.log(error);
    }
  }
}
  
const validate = (data) => {
  if (data.mail.contains("@") && data.password.length >= 4) return true;
};


module.exports = User;
