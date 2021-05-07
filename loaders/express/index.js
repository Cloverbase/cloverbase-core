const express = require('express');
const  bodyParser = require('body-parser');
const cors = require('cors');

const expressLoader = (app) => {

  // ...More middlewares

  // Return the express app
  return app;
}

module.exports = expressLoader;