
const User = require('../models/user');
//make admin users
exports.makeAdmin = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId)
    .then(user => {
        user.isAdmin = true;
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "User made admin"
        });
    
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })}
//make normal users
exports.makeNormal = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user =>{
        user.role = 0;
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "User made normal"
        });
    })
}
exports.makeSeller = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user =>{
        user.role = 1;
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "User made Seller"
        });
    })
}
exports.removeAdmin = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user =>{
        user.isAdmin = false;
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "Admin removed"
        });
    })
}
    
