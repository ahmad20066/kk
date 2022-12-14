const Product = require('../models/product');
const fs = require("fs");
const base = require('../helpers/base46_helper');
const Review = require('../models/review');
const ProductObject = require('../models/product_object');
const CustomProduct = require('../models/custom_product');
exports.saveProduct = (req, res, next) => {

    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;

    const images = req.body.images;

    let imageUrls = [];
    for (let i = 0; i < images.length; i++) {
        imageUrls.push(base(images[i]));
    }
    const price = req.body.price;
    const rating = req.body.rating;
    const custom = req.body.custom;
    const section = req.body.section;
    const parentProduct = req.body.parentProduct;
    const specificQuestion =  req.body.specificQuestion;

    console.log(imageUrls);

    const addedProduct = new Product({
        title: title,
        description: description,
        imageUrls: imageUrls,
        category: category,
        price: price,
        rating: rating,
        custom: custom,
        section: section,
        parentProduct: parentProduct,
        specificQuestion: specificQuestion
    });
    addedProduct.save().then(result => {
        res.status(201).json({
            Message: "Product Added Successfully",
            product: result,
        });
    })

}
exports.getProducts = (req, res, next) => {
    Product.find().then(products => res.status(201).json({
        products: products
    }));
}
exports.getProductById = (req, res, next) => {
    const prodId = req.params.prodId;
    Review.find({ product: prodId }).populate('user').then(reviews => {
        console.log('1');
        return Product.findById(prodId).then(async product => {
            product.reviews = reviews;
            const relatedProducts = await Product.find({ parentProduct: prodId });
            product.custom = new CustomProduct({
                products : relatedProducts,
                chosenProducts : []
            });
            console.log(reviews);
            res.status(201).json({
                product: product
            })

        })

    })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
exports.getProductsBySection = (req, res, next) => {
    const section = req.params.section;

    Product.find({ section: section, status: 'accepted' }).then(
        products => {
            res.status(200).json({
                products: products
            })
        }
    )
}
exports.getUserProducts = (req, res, next) => {
    const userId = req.params.userId;
    Product.find({ user: userId }).then(products => {

        res.status(201).json({
            products: products
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.deleteProduct = (req, res, next) => {
    const id = req.params.prodId;
    Product.findByIdAndDelete(id).then(result => {
        res.status(200).json({
            Message: "Deleted Succesfully",
        });
    })
}
exports.editUserProducts = (req, res, next) => {
    const id = req.params.prodId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newImage = req.body.imageUrl;
    const newimageUrl = base(newImage);

    Product.findByIdAndUpdate(id, {
        title: newTitle,
        description: newDescription,
        imageUrl: newimageUrl,
        updatedAt: new Date()
    }).then(product => {
        res.status(200).json({
            Message: "Updated Successfully",
            product: product
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.getPopularProducts = (req, res, next) => {
    Product.find({ rating: { $gte: 3 }, }).then(products => {
        res.status(200).json({
            products: products
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    });
}
exports.getNewProducts = (req, res, next) => {
    Product.find({ createdAt: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }, status: 'accepted' }).then(products => {
        res.status(200).json({
            products: products
        })
    });
}
exports.getProductsBySearch = (req, res, next) => {
    const search = req.params.search;
    Product.find({ title: { $regex: search },status : accepted }).then(products => {
        res.status(200).json({
            products: products
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
    );
}
//apply filters to the products

exports.getProductsByCategory = (req, res, next) => {
    const category = req.params.category;
    Product.find({ category: category, status: 'accepted' }).then(products => {
        res.status(200).json({
            products: products
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
    );
}
//update products
exports.updateProduct = (req, res, next) => {
    const id = req.params.prodId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const newImage = req.body.imageUrl;
    const newimageUrl = base(newImage);
    Product.findByIdAndUpdate(id, {
        title: newTitle,
        description: newDescription,
        imageUrl: newimageUrl,
        updatedAt: new Date()
    }).then(product => {
        res.status(200).json({
            Message: "Updated Successfully",
            product: product
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}





