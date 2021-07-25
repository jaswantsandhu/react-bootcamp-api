const { Schema, model, mongo } = require("mongoose");

const ProductSchema = new Schema({
    name : String,
    description : String,
    image : String,
    price : Number,
    ingredients : [ {
        name : String
    } ],
    rating : Number,
    discount : Number,
    topProduct : Boolean
})

//name description

const ProductsModel = model("products", ProductSchema, "products")

module.exports = ProductsModel;