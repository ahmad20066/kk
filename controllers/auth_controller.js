const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fast2sms = require('fast-two-sms');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');
// exports.singUp = async (req, res, next) => {
//     const number = req.body.number;
//     const name = req.body.name;
//     // const user = await User.findOne({ number: number });
//     // if (user) {
//     //     const error = new Error('User Already Exist');
//     //     error.statusCode = 422;
//     //     throw error;
//     // }
//     // const addedUser = new User({
//     //     number: number,
//     //     name: name
//     // });
//     // const result = await addedUser.save();
//     // res.status(200).json({
//     //     Message: "User Added Successfully",
//     //     user: addedUser
//     // })
//     // const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
//     // // save otp to user collection
//     // addedUser.phoneOtp = otp;
//     // await addedUser.save();
//     // send otp to phone number with twilio
//     var accountSid = "AC169d3fe3059fb86ac70a505ad2191b28"; // Your Account SID from www.twilio.com/console
//     var authToken = "9eff29bf27759c4ad94028f4ddc5bfa8";   // Your Auth Token from www.twilio.com/console

//     const client = twilio(accountSid, authToken, {
//         lazyLoading: true
//     });
//     client.messages.create({
//         body: `Your OTP From KayStore is 3333`,
//         from: '+12185262248',
//         to: number
//     }).catch(err => {
//         if (!err.statusCode) {
//             err.statusCode = 500;}
//         next(err);}
//                 );
// }
exports.logIn = (req, res, next) => {
    const number = req.body.number;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ number: number }).then(user => {
        if (!user) {
            const error = new Error('User Not Found');
            error.statusCode = 422;
            throw error;
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)
    }).then(isEqual => {
        if (!isEqual) {
            const error = new Error('Wrong Password');
            error.statusCode = 422;
            throw error;
        }
        const token = jwt.sign({ userId: loadedUser._id }, "secretahmad");
        res.status(200).json({
            Message: "LoggedIn Successfully",
            token: token,
            userId: loadedUser._id
        });

    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

//a function to get all users
exports.getAllUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json({
            users: users
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
// change user role
exports.becomeSeller = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user => {
        user.role = 1;
        return user.save();
    }).then(result => {
        res.status(200).json({
            Message: "User Role Changed Successfully",
            user: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.verifyOtp = (req, res, next) => {
    exports.verifyPhoneOtp = async (req, res, next) => {
        try {
            const otp = req.body.otp;
            const userId = req.body.userId;
            const user = await User.findById(userId);
            if (!user) {
                const error = new Error("User not found");
                error.statusCode = 404;
                throw error;

            }

            if (user.phoneOtp !== otp) {
                const error = new Error("Invalid Code");
                error.statusCode = 422;
                throw error;
            }
            //generate token
            const token = jwt.sign({ userId: user._id }, "secretahmad");

            user.phoneOtp = "";
            await user.save();

            res.status(201).json({
                type: "success",
                message: "OTP verified successfully",
                data: {
                    token,
                    userId: user._id,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user => {
        res.status(200).json({
            user: user
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

