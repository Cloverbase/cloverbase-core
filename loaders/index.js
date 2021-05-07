const expressLoader =require('./express/index.js');
// import run from './mongoDB/index.js';
const mongooseLoader = require('./mongoDB/index.js')

const loader =  async (expressApp) => {
  const mongoConnection =  mongooseLoader();
  console.log('MongoDB Initialized');
  await expressLoader(expressApp);
  console.log('Express Initialized');

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want
}

module.exports = loader;