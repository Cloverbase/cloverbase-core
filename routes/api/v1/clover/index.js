const express = require('express');
const { hello, dbInfo, getDbCollections, collectionData, addToCollection, getFromCollectionWhere } = require('../../../../controllers/cloverController');
const access = require('../../../access');
const auth = require('../../../auth');
const router = express.Router();


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


router.get('/',auth.required,access('readOwn','profile'),hello)

router.get('/db_info',dbInfo)
 
router.get('/getcollections',auth.required,access('readOwn','dbInfo'),getDbCollections)

router.get('/collection/:collection',collectionData)

router.post('/addtocollection/:collection',addToCollection)

router.post('/getfromwhere/:collection',getFromCollectionWhere)


module.exports = router;