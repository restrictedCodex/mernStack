const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      (req.product = product), next();
    });
};

exports.createproduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenshion = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    //destructure the fields
    const { price, name, description, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "declare all fileds ",
      });
    }

    //TODO: restriction on feild
    let product = new Product(fields);

    // handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.staus(400).json({
          error: "too big file",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Problem saving tshirt in db",
        });
      }
      res.json(product);
    });
  });
};

exports.getPrduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "delet was successful",
    });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtenshion = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image",
      });
    }

    // updation code
    let product = req.product;
    product = _.extend(product, fields);

    // handle file
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.staus(400).json({
          error: "too big file",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Problem updating tshirt in db",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "no product found",
        });
      }
      res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
});

Product.bulkWrite(myOperations, [], (err, product) => {
    if (err) {
      return res.status(400).json({
        error: "bulk stock update not done",
      });
    }
    next();
  });
};
