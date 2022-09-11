const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
    const token = req.get("Authorization");
    if(!token){
        const error = new Error('not Authenticated');
        error.statusCode = 401;
        throw error;
    }
    let decodedToken;
    try{
         decodedToken = jwt.verify(token,"secretahmad");
        if(!decodedToken){
            const error = new Error('not Authenticated');
            error.statusCode = 401;
            throw error;
        }
    }catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        throw err;
    };
    req.userId =  decodedToken.userId;
    next();
}