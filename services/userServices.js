const userModel = require('../models/userModel')

class User{

    async getAll(){
        try{
            const users = await userModel.find()
            return users // Array of Users
        }catch(error){
            console.log(error)
        }
    }

    async getOne(mail){
        
        try{
            const user = await userModel.findOne(mail)
            console.log(user)
            return user // Objeto
        }catch(error){
            console.log(error)
        }
    }

    async create(data){
        try{
            
            if(validate){
            const user = await userModel.create(destructurarData(data))
            return user // Objeto
        }
        }catch(error){
            console.log(error)
        }
    }

    async update(id,data){
        try{
            const newUser = await userModel.findByIdAndUpdate(id,destructurarData(data),{new:true})
            
            return newUser // Objeto
        }catch(error){
            console.log(error)
        }
    }

    async delete(id){
        try{
            const user = await userModel.findByIdAndDelete(id)
            return user
        }catch(error){
            console.log(error)
        }
    }

    
}
const validate = (data)=>{
    if(data.mail.contains('@') && data.password.length >= 4 ) return true  
    
}

const destructurarData = (data)=>{
    
    const {name,email,username,occupation,password} = data
    
    const user = {name, email, username, occupation, password  }
    
    return  user
}

module.exports = User