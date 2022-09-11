const express = require('express');
const router = express.Router();
const controller = require('../controllers/category_controller');
router.get('/',controller.getCategories);
router.post('/',controller.addCategory);
router.get('/:section',controller.getCategoriesBySection);//get categories by section
module.exports = router;