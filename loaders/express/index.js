const express = require('express');
const  bodyParser = require('body-parser');
const cors = require('cors');

const expressLoader = (app) => {

  // ...More middlewares
  // the boddy midlleware for the app(included in the new version of express :)
  app.use(express.json());
  // require('./config/passport');
  app.use('/uploads',express.static( __dirname + "/uploads"));
  /*------------- the routes :-) */
  app.use(require('../../routes'));
    ///404 error page
  app.use((req, res) => {
        res.status(404).send("404 page not found");
    });
  console.log("the upload direcotory is set as static folder");
  // Return the express app
  return app;
}

module.exports = expressLoader;