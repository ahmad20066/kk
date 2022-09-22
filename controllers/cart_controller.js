const Cart = require('../models/cart');
const User = require('../models/user');
exports.GetCart = (req, res, next) => {
    const user = req.params.user;
    Cart.findOne({ user: user }).then(cart => {
        res.status(200).json({
            cart: cart
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.AddToCart = (req, res, next) => {
    const user = req.body.user;
    const product = req.body.product;
    const quantity = req.body.quantity;
    let fetchedCart;
    Cart.findOne({ user: user }).then(cart => {
        if (!cart) {
            const newCart = new Cart({
                user: user,
                products: [{ product: product, quantity: quantity }]
            })
            return newCart.save();
        }
        fetchedCart = cart;
        const productIndex = cart.products.findIndex(p => {
            return p.product.toString() === product.toString();
        })
        if (productIndex >= 0) {
            const updatedProduct = { ...cart.products[productIndex] };
            updatedProduct.quantity = updatedProduct.quantity + quantity;
            const updatedProducts = [...cart.products];
            updatedProducts[productIndex] = updatedProduct;
            cart.products = updatedProducts;
            return cart.save();
        } else {
            cart.products = cart.products.concat({ product: product, quantity: quantity });
            return cart.save();
        }
    }).then(result => {
        res.status(201).json({
            message: "Product added to cart",
            cart: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.RemoveFromCart = (req, res, next) => {
    const user = req.body.user;
    const product = req.body.product;
    let fetchedCart;
    Cart.findOne({ user: user }).then(cart => {
        fetchedCart = cart;
        const productIndex = cart.products.findIndex(p => {
            return p.product.toString() === product.toString();
        })
        if (productIndex >= 0) {
            const updatedProducts = [...cart.products];
            updatedProducts.splice(productIndex, 1);
            cart.products = updatedProducts;
            return cart.save();
        }
    }).then(result => {
        res.status(200).json({
            message: "Product removed from cart",
            cart: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
// Remove All from cart
exports.RemoveAllFromCart = (req, res, next) => {
    const user = req.params.user;
    Cart.findOne({ user: user }).then(cart => {
        cart.products = [];
        return cart.save();
    }).then(result => {
        res.status(200).json({
            message: "Cart cleared",
            cart: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
