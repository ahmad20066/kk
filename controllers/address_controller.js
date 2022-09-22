const Address = require('../models/address');
exports.addAddress = (req, res, next) => {
    const user = req.body.user;
    const street = req.body.street;
    const building = req.body.building;
    const floor = req.body.floor;
    const description = req.body.description;
    const address = new Address({
        user: user,
        street: street,
        building: building,
        floor: floor,
        description: description
    });
    address.save().then(result => {
        res.status(201).json({
            message: "Address Added",
            address: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.getAddressesOfUser = (req, res, next) => {
    const user = req.params.userId;
    Address.find({ user: user }).then(addresses => {
        res.status(201).json({
            addresses: addresses
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.updateAddress = (req, res, next) => {
    const addressId = req.params.addressId;
    const street = req.body.street;
    const building = req.body.building;
    const floor = req.body.floor;
    const description = req.body.description;
    Address.findById(addressId).then(address => {
        address.street = street;
        address.building = building;
        address.floor = floor;
        address.description = description;
        return address.save();
    }).then(result => {
        res.status(200).json({
            message: "Address Updated",
            address: result
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.deleteAddress = (req,res,next) => {
    const addressId = req.params.addressId;
    Address.findByIdAndDelete(addressId).then(
        address => {
            res.status(200).json({
                message: "Address Deleted",
                address: address
            })
        }
    ).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;

        }
        next(err);
    }) 
}
