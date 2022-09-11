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
router.get('/products/:section/:category', controller.getProductsBySection);
router.get('/products/:section', controller.getProductsBySection);
router.get('/products/:filter', controller.getProductsByFilter);
//products/admin/update/:prodId
router.put('/products/admin/update/:prodId', controller.editUserProducts);
router.delete('/products/delete/:prodId', controller.deleteProduct);
router.get('/products/user/:userId', controller.getUserProducts);
//get products by filters




module.exports = router;