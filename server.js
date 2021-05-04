const loaders = require('./loaders');
const express = require('express');


async function startCloverServer() {

    const app = express();
  
    await loaders.init({ expressApp: app });
  
    app.listen(process.env.PORT || 5000, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Clover server is ready !`);
    });
  }

startCloverServer();