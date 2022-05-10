const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function authValidation(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const bearer = req.headers.authorization;
console.log("en auth ")
    const [, token] = bearer.split("Bearer "); //Destructuring arrays.

    if (token) {
      try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded
        console.log(decoded)
       next();
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
