const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

const dbName = 'food-ordering';
//port change back 27017
const url = 'mongodb://localhost:27016/'+dbName;
mongoose.connect(url)

// const client = new MongoClient(url);

// module.exports = {
//     client,
//     dbName
// }