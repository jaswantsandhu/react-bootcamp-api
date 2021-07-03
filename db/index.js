const MongoClient = require('mongodb').MongoClient;

let db = null
// Connection URL
// Database Name
const dbName = 'food-ordering';
const url = 'mongodb://localhost:27017/'+dbName;

const client = new MongoClient(url);

module.exports = {
    client,
    dbName
}