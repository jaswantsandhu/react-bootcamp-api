const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

const dbName = 'food-ordering';
const url = 'mongodb://localhost:27017/'+dbName;
mongoose.connect(url)

// const client = new MongoClient(url);

// module.exports = {
//     client,
//     dbName
// }