const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart_controller');
router.get('/:user', controller.GetCart);
router.post('/', controller.AddToCart);
router.delete('/', controller.RemoveFromCart);
//clear cart
router.delete('/:user', controller.RemoveAllFromCart);

router.put('/remove',controller.removeQuantity);
module.exports = router;