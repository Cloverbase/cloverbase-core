const express = require('express');
const loaders = require('./loaders');
const {port} = require('./config')


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// Author  : Abdellatif Ahammad


async function startCloverServer() {
    const bodyParser = require('body-parser');
    const session = require('express-session');
    const app = express();
   
    await loaders(app);
    app.listen(port || 5000, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Clover server is ready and runing in port : ${port || 5000}!`);
    });
  }

startCloverServer();