const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    mongoClient.connect('mongodb://root:123456@localhost:27017/?authSource=admin')
    .then(client => {
        console.log('Connected !!');
        return callback(client)
    })
    .catch(err => console.error(err))
}

module.exports = mongoConnect