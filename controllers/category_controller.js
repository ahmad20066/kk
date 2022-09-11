const Category = require('../models/category');
const Section = require('../models/section');
const base46 = require('../helpers/base46_helper')
exports.getCategories = (req, res, next) => {
    Category.find().then(categories => {
        res.status(200).json({
            categories: categories
        });
    });
}
exports.addCategory = (req, res, next) => {
    const title = req.body.title;
    const section = req.body.section;
    const addedCategory = new Category({
        title: title,
        section: section
    });
    addedCategory.save().then(result => {
        res.status(200).json({
            message: "Category Added Successfully",
            category: addedCategory
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getCategoryById = (req, res, next) => {
    const catId = req.params.catId;
    Category.findById(catId).then(category => {
        res.status(200).json({
            category: category
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
    )
}
exports.getCategoriesBySection = (section) =>

    Category.find({ section: section })
//add categories to section
// exports.addCategories = (categories, sectionId) => {
//     console.log('3');
//     let section1;
//     return .then(section => {
//             se
//         }).catch(err => {
//             console.log(err);
//         })
   
// }


