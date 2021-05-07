const loaders = require('./loaders');
const express = require('express');


async function startCloverServer() {
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
   
    await loaders(app);
    app.listen(process.env.PORT || 5000, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Clover server is ready and runing in port : ${process.env.PORT || 5000}!`);
    });
  }

startCloverServer();