const Review = require('../models/review');
const Product = require('../models/product');
exports.AddReview = (req, res, next) => {
    const content = req.body.content;
    const rating = req.body.rating;
    const image = req.body.image;
    const product = req.body.product;
    const user = req.body.user;
    const addedReview = new Review({
        content: content,
        rating: rating,
        image: image,
        product: product,
        user: user,
    });

    addedReview.save().then(
        result => {
            //edit product rating
            Product.findById(product).then(product => {
                product.rating = (product.rating + rating) / 2;
                product.save();
            }
            )

        }
    ).then(result => {
        res.status(201).json({
            Message: "Review added Successfully",
            review: addedReview
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
exports.getReviewsOfProduct = (req, res, next) => {
    const productId = req.params.productId;
    Review.find({ product: productId }).then(reviews => {
        res.status(201).json({
            reviews: reviews
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}
