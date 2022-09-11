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
exports.createCategory = (title,section) => {
    
    
    const addedCategory = new Category({
        title: title,
        section: section,
        
    });
    return addedCategory.save()
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


