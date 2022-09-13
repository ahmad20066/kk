const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.singUp = (req,res,next) => {
    const number = req.body.number;
    const name = req.body.name;
    const password = req.body.password;
    let addedUser;
    bcrypt.hash(password,12).then(hashedPassword => { 
         addedUser = new User({
            number : number,
            password : hashedPassword,
            name : name,
        })
        return addedUser.save()
    }).then(result => {
        const token = jwt.sign({userId : addedUser._id},"secretahmad");
        res.status(200).json({
            Message : "Signed Up Successfully",
            user : addedUser,
            jwt : token
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    })
}
exports.logIn = (req,res,next) => {
    const number = req.body.number;
    const password = req.body.password;
    let loadedUser;
    User.findOne({number : number}).then(user => {
        if(!user){
            const error = new Error('User Not Found');
            error.statusCode = 422;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password,user.password)
    }).then(isEqual => {
        if(!isEqual){
            const error = new Error('Wrong Password');
            error.statusCode = 422;
            throw error;
        }
        const token = jwt.sign({userId : loadedUser._id},"secretahmad");
        res.status(200).json({
            Message : "LoggedIn Successfully",
            token : token,
            userId : loadedUser._id
        });

    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

//a function to get all users
exports.getAllUsers = (req,res,next) => {
    User.find().then(users => {
        res.status(200).json({
            users : users
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
// change user role
exports.becomeSeller = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user => {
        user.role = 1;
        return user.save();
    }).then(result => {
        res.status(200).json({
            Message : "User Role Changed Successfully",
            user : result
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
