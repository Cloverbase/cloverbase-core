// const loaders = require('./loaders');
const express = require('express');
const { MongoClient } = require("mongodb");

async function startCloverServer() {
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
   
    // await loaders.init(app);

    const { MongoClient } = require("mongodb");

    const uri =
    "mongodb://127.0.0.1:27017";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });


    async function run() {
        const connection = await client.connect().then((res,err)=>{
          if(res){
            console.log("Clover MongoDB is Started successfully");
          }else{
            console.error("Oops, Clover can't connect to your MongoDB !")
          }
        })
        const database = client.db('clover');
        return client;
    }

    run().catch(console.dir);
    app.listen(process.env.PORT || 5000, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Clover server is ready !`);
    });
  }

startCloverServer();