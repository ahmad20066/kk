
const User = require('../models/user');
const Order = require('../models/order');
const Product = require('../models/product');
//make admin users

//make normal users
exports.makeNormal = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user =>{
        user.role = 'user';
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "User made normal"
        });
    })
}
exports.makeSeller = (req,res,next) => {
    const userId = req.params.userId;
    User.findById(userId).then(user =>{
        user.role = 'seller';
        return user.save();
    }).then(result => {
        res.status(200).json({
            message : "User made Seller"
        });
    })
}

exports.changeOrderStatus = (req,res,next) => {
    const orderId = req.params.orderId;
    const status = req.params.status;
    Order.findById(orderId).then(order => {
        order.status = status;
        return order.save();
    }).then(result => {
        res.status(200).json({
            message : "Order " + status,
        });
    })
}

exports.ChangeProductStatus = (req,res,next) => {
    const productId = req.params.productId;
    const status = req.params.status;
    Product.findById(productId).then(product => {
        product.status = status
        return product.save();
    }).then(result => {
        res.status(200).json({
            message : "Product " + status,
        });
    })
}

exports.getOrders = (req,res,next) => {
    Order.find().then(orders => {
        res.status(201).json({
            orders : orders,
        })
    })
}


    
