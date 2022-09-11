const express = require('express');
const router = express.Router();
const controller = require('../controllers/section_controller');
router.post('/',controller.addSection);
router.get('/',controller.getSections);
router.get('/:sectionId',controller.getSectionById);
module.exports = router;
