const Router = require("express").Router();
const ProductsModel = require("../db/schema/products");
const AdminAuth = require("../middlewares/admin-auth")
const multer = require("multer");
const files = multer();
const fs = require("fs");
const { promisify } = require("util");
const writeFilePromise = promisify(fs.writeFile)
const unlinkFilePromise = promisify(fs.unlink);
const path = require("path")

// /products
Router.get("/", (req, res) => {
  ProductsModel.find((err, data) => {
    res.json(data);
  });
});

// /products
Router.post("/", files.any(), AdminAuth, async (req, res) => {
  try {
    const { description, image, name, price, rating } = req.body;
    const productImage = req.files[0]
    const random = Math.ceil(Math.random() * 100000000);

    await writeFilePromise(`./public/products/images/${random + productImage.originalname}`, productImage.buffer)

    if (description && name && price) {
      const newProduct = new ProductsModel({
        description,
        name,
        image : `/public/products/images/${random + productImage.originalname}`,
        price,
        rating,
      });
      const doc = await newProduct.save();
      res.send({ status: "success", inserted: doc });
    } else {
      res.send({ status: "failure" });
    }
  } catch (error) {
    console.log(error)
    res.send({ status: "failure" });
  }
});

// /products/1
// /products/2
// /products/1000
// /products/dasdshadjkahd
Router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // ProductsModel.deleteOne({ _id : id })
  // .then(()=>{
  //   res.json({ status : "success" })
  // }).catch(()=>{
  //   res.statusCode(500).json({ status : "error" })
  // })

  try {
    const doc = await ProductsModel.findOne({ _id : id });
    await unlinkFilePromise(path.join("./public" + doc.image));
    const a = await ProductsModel.deleteOne({ _id: id });
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error" });
  }
});

module.exports = Router;
