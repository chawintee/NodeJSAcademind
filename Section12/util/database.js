const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;

let _db

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb://root:123456@localhost:27017/?authSource=admin')
    .then(client => {
        _db = client.db('shop')
        console.log('Connected !!');
        return callback(client)
    })
    .catch(err => {
        console.error(err)
        throw err
    })
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw "No datebase found!!"
}

module.exports = {mongoConnect, getDb }