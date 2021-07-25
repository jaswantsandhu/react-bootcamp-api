const { GraphQLSchema, GraphQLList, GraphQLScalarType, GraphQLString, GraphQLBoolean, GraphQLObjectType, GraphQLFloat, GraphQLInt } = require("graphql");
const ProductsModel = require("../db/schema/products")
const Products = new GraphQLObjectType({
    name : "product",
    fields : {
        name : { type : GraphQLString },
        description : { type : GraphQLString },
        image : { type : GraphQLString },
        price : { type : GraphQLFloat },
        ingredients : { type : GraphQLString },
        rating : { type : GraphQLInt },
        discount : { type : GraphQLFloat },
        topProduct : { type : GraphQLBoolean },
    }
})

const Root = new GraphQLObjectType({
    name : "Root",
    fields : {
        products : {
            type : GraphQLList(Products),
            resolve : ()=>{
                return ProductsModel.find()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : Root
})