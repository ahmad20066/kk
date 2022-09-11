const Section = require('../models/section');
const catController = require('../controllers/category_controller');
const section = require('../models/section');
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
    addedSection.save().then(section => {
        section1 = section;
        new Promise((resolve, r) => {
            let count = 0;
            stringCategories.forEach(element => {
                try {
                    console.log('1');
                    catController.createCategory(element, section._id).then(category => {
                        try {
                            console.log('2');
                            count += 1
                            section1.categories.push(category._id);
                        }catch(e){

                        }finally{
                            if (count == stringCategories.length) {
                                resolve()
                            }
                        }
                   
                    })
                } catch (e) {
                    // error handling

                    console.log(e)
                } 
            });
        }).then(l => {
            // console.log('3');
            Section.findById(section1._id).then(section => {
                

                section.categories = section1.categories;
                
            
                section.save().then(section => {
                    res.status(200).json({
                        section: section
                    })
                }).catch(err => {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                }
                )
            })
            
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    })
}
exports.getSections = (req, res, next) => {


    Section.find().populate('categories').then(sections => {
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