const express = require('express')
const router = express.Router();
const controller = require('../controllers/products');
const isAuth = require('../middlewares/is_auth');
//shop/products
router.post('/products', controller.saveProduct);
router.get('/products', controller.getProducts);
//shop/products/:prodId
router.get('/products/:prodId', controller.getProductById);
//shop/products/:section/:category

router.get('/products/section/:section', controller.getProductsBySection);

//products/admin/update/:prodId
router.put('/products/update/:prodId', controller.editUserProducts);
router.delete('/products/:prodId', controller.deleteProduct);
router.get('/products/user/:userId', controller.getUserProducts);
router.get('/products/category/:category', controller.getProductsByCategory);
router.get('/products/search/:search', controller.getProductsBySearch);
//get products by filters




module.exports = router;