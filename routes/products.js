const Router = require("express").Router();
const ProductsModel = require("../db/schema/products");
const AdminAuth = require("../middlewares/admin-auth")


// /products
Router.get("/", (req, res) => {
  ProductsModel.find((err, data) => {
    res.json(data);
  });
});

// /products
Router.post("/", AdminAuth, async (req, res) => {
  try {
    const { description, image, name, price, rating } = req.body;

    if (description && name && price) {
      const newProduct = new ProductsModel({
        description,
        image,
        name,
        price,
        rating,
      });
      const doc = await newProduct.save();
      res.send({ status: "success", inserted: doc });
    } else {
      res.statusCode(404).send({ status: "failure" });
    }
  } catch (error) {
    res.statusCode(500).send({ status: "failure" });
  }
});

// /products/1
// /products/2
// /products/1000
// /products/dasdshadjkahd
Router.delete("/:id", AdminAuth, async (req, res) => {
  const { id } = req.params;

  // ProductsModel.deleteOne({ _id : id })
  // .then(()=>{
  //   res.json({ status : "success" })
  // }).catch(()=>{
  //   res.statusCode(500).json({ status : "error" })
  // })

  try {
    const a = await ProductsModel.deleteOne({ _id: id });
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});

module.exports = Router;
