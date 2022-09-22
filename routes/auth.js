const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth_controller');
//router.post('/signUp',controller.singUp);
router.post('/logIn',controller.logIn);

router.get('/getUsers',controller.getAllUsers);
router.post('/verifyOtp',controller.verifyOtp);
router.get('/user/:userId',controller.getUserById);

module.exports = router;