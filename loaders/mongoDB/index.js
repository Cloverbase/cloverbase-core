const { MongoClient } = require("mongodb");

const uri =
"mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function run() {

    const connection = await client.connect();
    const database = client.db('training');
    return client;

}

run().catch(console.dir);