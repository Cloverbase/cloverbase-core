const jwt = require('express-jwt');
const { readRules, writeRules, storageRules } = require('../config/config');
const { getDbRules } = require('../database');
const access = require('./access');
const auth = require('./auth');
const sdk = require('./sdk');

// 
//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 



const rules = {
    read:  readRules==="admin"?[auth.required,access('readAny','data'),sdk.admin()]:readRules==="auth"?[auth.required,access('readOwn','data'),sdk.all()]:[auth.optional,sdk.all()],
    write: writeRules==="admin"?[auth.required,access('createAny','data'),sdk.admin()]:writeRules==="auth"?[auth.required,access('createOwn','data'),sdk.all()]:[auth.optional,sdk.all()],
    storage: storageRules==="admin"?[auth.required,access('createAny','files'),sdk.admin()]: storageRules==="auth"?[auth.required,access('createOwn','files'),sdk.all()]:[auth.optional,sdk.all()],
};

module.exports = rules;