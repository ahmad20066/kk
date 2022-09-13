const express = require('express');
const router = express.Router();
const controller = require('../controllers/review_controller');
router.post('/', controller.AddReview);
router.get('/:productId', controller.getReviewsOfProduct);
module.exports = router;