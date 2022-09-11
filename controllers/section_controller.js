const Section = require('../models/section');
const objectSection = require('../models/section_object');
const catController = require('../controllers/category_controller');
const section = require('../models/section');
const Category = require('../models/category');
exports.addSection = (req, res, next) => {
    const title = req.body.title;
    const quote = req.body.quote;
    const icon = req.body.icon;
    const stringCategories = req.body.categories;
    const addedSection = new Section({
        title: title,
        quote: quote,
        icon: icon,
    });
    let section1;
    const addCategories = [];
    addedSection.save().then(result => {
        res.status(200).json({
            message: "Section Added Successfully",
            section: addedSection,
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
}
exports.getSections = (req, res, next) => {
    Section.find().then(sections => {
        res.status(200).json({
            sections: sections
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
}
exports.getSectionById = (req, res, next) => {
    const sectionId = req.params.sectionId;
    Category.find({ section: sectionId }).then(categories => {
        Section.findById(sectionId).then(section => {
            objectSection = new objectSection({
                title: section.title,
                quote: section.quote,
                icon: section.icon,
                categories: categories
            })
        })
    }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err);
        })
}