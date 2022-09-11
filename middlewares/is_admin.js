//isAdmin middleware
module.exports =  (req,res,next) => {
    if(req.user.isAdmin){
        next();
    }else{
        const error = new Error('Not Authorized');
        error.statusCode = 401;
        next(error);
    }
}

                        



