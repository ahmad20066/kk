const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin_controller.js');

router.put("/Normal/:userId", controller.makeNormal);
router.put("/Seller/:userId", controller.makeSeller);
router.post('/changeOrderStatus/:orderId/:status', controller.changeOrderStatus);

router.post('/changeProductStatus/:productId/:status', controller.ChangeProductStatus);

module.exports = router;