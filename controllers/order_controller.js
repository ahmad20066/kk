const Order = require('../models/order');
const Cart = require('../models/cart');
const address = require('../models/address');
const Address = require('../models/address');


exports.placeOrder = async(req,res,next) => {
    const user = req.body.user;
    const total = req.body.total;
    const address = req.body.address;
    const shippingPrice = req.body.shippingPrice;
    const cart = await Cart.findOne({user : user});
    console.log(cart.products);
    const order = new Order({
        user : user,
        products : cart.products,
        total : total,
        address : address,
        shippingPrice : shippingPrice
    });
    
    order.save().then(async result => {
        await cart.remove();
        res.status(201).json({
            message : "Order Placed",
            order : result
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
exports.getOrders = (req,res,next) => {
    const user = req.params.user;
    
    Order.find({user : user}).populate('address').populate({path : 'products',populate : {path : 'product',model : 'Product'}}).then(orders => {
        res.status(201).json({
            orders : orders
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
    )
}
exports.getShippingPrice = (req,res,next) => {
}
exports.cancelOrder = (req,res,next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId).then(order => {
        order.status = "cancelled";
        order.save().then(result => {
            res.status(201).json({
                order : result
            })
        }).catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        })
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

