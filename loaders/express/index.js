const express = require('express');
const  bodyParser = require('body-parser');
const cors = require('cors');
const morgan  = require('morgan');
var path = require('path');
var winston = require('../../config/winston');
const logger = require('../../config/winston');
const expressLoader = (app) => {
  
  // ...More middlewares
  // the boddy midlleware for the app(included in the new version of express :)
  app.use(express.json());
  app.use(cors());
  // require('./config/passport');
  // app.use('/uploads',express.static(path.join(__dirname, '../../uploads')));
  console.log(path.join(__dirname, '../../uploads'));
  // the logger setup morgan comibned with winston 
  app.use(morgan('{"remote_addr": ":remote-addr", "remote_user": ":remote-user", "date": ":date[clf]", "method": ":method", "url": ":url", "http_version": ":http-version", "status": ":status", "result_length": ":res[content-length]", "referrer": ":referrer", "user_agent": ":user-agent", "response_time": ":response-time"}', {stream: winston.stream}));
//  logger.log({"level":'error',"message":"abdo erroring test"})
  /*------------- the routes :-) */
  app.use(require('../../routes'));///404 error page
  app.use((req, res) => {
        res.status(404).send("404 page not found");
    });
  console.log("the upload direcotory is set as static folder");
  // Return the express app
  return app;
}

module.exports = expressLoader;