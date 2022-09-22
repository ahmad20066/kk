const express = require('express');
const router = express.Router();
const controller = require('../controllers/address_controller');
router.get('/:userId',controller.getAddressesOfUser);
router.post('/',controller.addAddress);
router.delete('/:addressId',controller.deleteAddress);
router.put('/:addressId',controller.updateAddress);
module.exports = router;