const { MongoClient } = require("mongodb");
const {mongoURI} = require('../../config');

const uri =mongoURI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongooseLoader = async (DB_name) => {

    const connection = await client.connect();
    const database = client.db(DB_name);
    return client;

}

module.exports = mongooseLoader;