const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function authValidation(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const bearer = req.headers.authorization;

    const [, token] = bearer.split("Bearer "); //Destructuring arrays.

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = {
          _id: decoded.id,
          name : decoded.name,
          email: decoded.email,
          role: decoded.role
        }
        
       next();
       return
      } catch ({ name, message }) {
        return res.json({
          error: true,
          name,
          message,
        });
      }
    }
  }else{
    return res.status(403).json({
        error: true,
        message: "Insufficient Permissions auth" 
      });
  }
 
}

module.exports = authValidation;


