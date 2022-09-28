const Cart = require('../models/cart');
const User = require('../models/user');
exports.GetCart = (req, res, next) => {
    const user = req.params.user;
    Cart.findOne({ user: user }).populate({path : 'products',populate : {path : 'product',model : 'Product'}}).then(cart => {
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
    const specificNote = req.body.specificNote;
    let fetchedCart;
    Cart.findOne({ user: user }).then(cart => {
        if (!cart) {
            const newCart = new Cart({
                user: user,
                products: [{ product: product, quantity: quantity,specificNote : specificNote }]
            })
            return newCart.save();
        }
        fetchedCart = cart;
        const productIndex = cart.products.findIndex(p => {
            return p.product.toString() === product.toString();
        })
        
        if (productIndex >= 0) {
            console.log(cart.products[productIndex]);
            
            const updatedProduct = cart.products[productIndex];
            updatedProduct.quantity = updatedProduct.quantity + quantity;
            console.log(updatedProduct);
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
        
        return cart.remove();
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


        
//remove quantity

exports.removeQuantity = (req,res,next) => {
    const user = req.body.user;
    const product = req.body.product;
    let fetchedCart;
    Cart.findOne({ user: user }).then(cart => {
        fetchedCart = cart;
        const productIndex = cart.products.findIndex(p => {
            return p.product.toString() === product.toString();
        })
        if (productIndex >= 0) {
            const updatedProduct = cart.products[productIndex];
            updatedProduct.quantity = updatedProduct.quantity - 1;
            console.log(updatedProduct);
            const updatedProducts = [...cart.products];
            updatedProducts[productIndex] = updatedProduct;
            cart.products = updatedProducts;
            return cart.save();
        } 
    }).then(result => {
        res.status(200).json({
            message: "Product quantity removed",
            cart: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
