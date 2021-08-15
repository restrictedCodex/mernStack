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
    const {price, name, description, category, stock} = fields;
    if(
        !name ||
        !description ||
        !price ||
        !category ||
        !stock 
    ){
        return res.status(400).json({
            error: "declare all fileds ",
        });
    }

    //TODO: restriction on feild
    let product = Product(fields);

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
    product.save((err, product)=>{
        if (err) {
            return res.status(400).json({
              error: "Problem saving tshirt in db",
            });
        }
        res.json(product);
    })
  });
};
