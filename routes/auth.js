const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth_controller');
router.post('/signUp',controller.singUp);
router.post('/logIn',controller.logIn);

router.get('/getUsers',controller.getAllUsers);

module.exports = router;