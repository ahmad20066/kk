const Order = require('../models/order');
exports.getOrders = (req,res,next) => {
    Order.find().then(orders => {
        res.status(201).json({
            orders : orders,
        })
    })
}

exports.placeOrder = (req,res,next) => {
    const date = req.body.date;
    const products = req.body.products;
    const addedOrder = new Order({
        date : date,
        products : products
    });
    addedOrder.save().then(result => {
        res.status(201).json({
            Message : "Order added Successfully",
            order : addedOrder
            
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.getOrder = (req,res,next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).then(order => {
        res.status(201).json({
            order : order
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.deleteOrder = (req,res,next) => {
    const orderId = req.params.orderId;
    Order.findByIdAndDelete(orderId).then(order => {
        res.status(201).json({
            order : order
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}
