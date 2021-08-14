const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id, (err, cate) => {
    if (err) {
      return res.status(400).json({
        error: " no product exist in the category",
      });
    }
    req.category = cate;
  });
  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save in db",
      });
    }
    req.json(category);
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No category found",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;

  category.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        error: "failed to update category",
      });
    }
    res.json(updateCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "failed to update category",
      });
    }
    res.json({
      message: "Sucfully deleted",
    });
  });
};
