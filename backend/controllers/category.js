const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) =>{
    Category.findById(id, (err, cate) => {
        if(err){
            return res.status(400).json({
                error: " no product exist in the category"
            });
        }
        req.category = cate;
    })
    next();
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category)=> {
        if(err){
            return res.status(400).json({
                error: "not able to save in db"
            });
        }
        req.json(category);
    })
}