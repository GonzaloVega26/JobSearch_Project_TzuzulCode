const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { jwtSecret } = require("../config")
const UserService = require("./userServices")

class Auth{
    
   async login(data){
        const userService = new UserService()
        
        const user = await userService.getOneByEmail(data.email)

        if(user){
            const result = await bcrypt.compare(data.password, user.password)
            
            if(result && await this.#comparePasswords(data.password, user.password)) {
               
               
                return this.#sendInformation(user)
            }
        }
     
        return {error:true}
    }

    async signup(data){
        const userService = new UserService()
        if(data.password){
            data.password = await this.#encrypt(data.password)
        }else{
            return {error:true,message: "Missing Password"}
        }
       
        const user = await userService.create(data)
        if(user.error){
            return user
        }
        return this.#sendInformation(user)

    }

    #sendInformation(user){
        const userData = {
            name:user.name,
            email:user.email,
            role: user.role,
            id:user.id
        }
        const token = this.#createToken(userData)
        return {
            user:userData,
            token
        }
    }

    #createToken(payload){
        const token = jwt.sign(payload,jwtSecret,{
            expiresIn:'7d'
        })
        return token
    }

    async #encrypt(string){
        try{
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(string,salt)

            return hash
        }catch(error){
            console.log(error)
        }
    }

    async #comparePasswords(string,hash){
        const result = await bcrypt.compare(string, hash)
        return result
    }
}

module.exports = Auth