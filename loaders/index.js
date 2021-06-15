const expressLoader =require('./express/index.js');
// import run from './mongoDB/index.js';
const mongooseLoader = require('./mongoDB/index.js')
const {db,mongoURI} = require('../config/config')
const CFonts = require('cfonts');
const { getDbRules } = require('../database/index.js');



//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// Author  : Abdellatif Ahammad

var db_rules ={}

const loader =  async (expressApp) => {
  const mongoConnection =  mongooseLoader(db);
  CFonts.say('Clover', {
    font: 'block',              // define the font face
    align: 'center',              // define text alignment
    colors: ['#C9F0DD','#20AA76'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: false,            // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment CFonts is being executed in
  }); 
  console.log('MongoDB Initialized');
  console.log("DB Name: " + db );
  console.log("DB URI: " + mongoURI);
  await expressLoader(expressApp);
  console.log('Express Initialized');
  require('../config/passport')

  // ... more loaders can be here

  // ... Initialize agenda
  // ... or Redis, or whatever you want

}

module.exports = loader;
