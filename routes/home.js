const express = require('express');
const router = express.Router();
const controller = require('../controllers/products');
router.get('/popular',controller.getPopularProducts);
router.get('/new',controller.getNewProducts);
module.exports = router;