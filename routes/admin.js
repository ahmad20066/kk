const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_controller.js');
const isAdmin = require('../middlewares/is_admin')
router.post("/add/:userId",isAdmin,controller.makeAdmin);
router.put("/Normal/:userId",isAdmin,controller.makeNormal);
router.delete("/removeAdmin/:userId",isAdmin,controller.removeAdmin);
router.put("/Seller/:userId",isAdmin,controller.makeSeller);
module.exports = router;