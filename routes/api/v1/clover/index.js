const express = require('express');
const { hello, dbInfo, getDbCollections, collectionData, addToCollection, getFromCollectionWhere, getDocument, updateDocument, deleteDocument, adminCloverCollectionData, adminCloverAddToCollection, adminCloverGetFromCollectionWhere, adminCloverGetDocument, adminCloverUpdateDocument, adminCloverDeleteDocument, adminCloverGenerateNewSdk } = require('../../../../controllers/cloverController');
const access = require('../../../access');
const auth = require('../../../auth');
const router = express.Router();
const activation = require('../../../activation');
const rules = require('../../../rules');
const sdk = require('../../../sdk');

// 
//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 


router.get('/',hello)

 
router.get('/collection/:collection',rules.read,collectionData)

router.post('/addtocollection/:collection',rules.write,addToCollection)

router.post('/getfromwhere/:collection',rules.read,getFromCollectionWhere)

router.get('/getDocument/:collection/:document',rules.read,getDocument)

router.put('/updateDocument/:collection/:document',rules.write,updateDocument)

router.delete('/deleteDocument/:collection/:document',rules.write,deleteDocument)

// 
// Admin only routes High permsions required
// 
router.get('/db_info',auth.required,access('readAny','data'),sdk.admin(),dbInfo)

router.get('/admin/getcollections',auth.required,access('readAny','data'),sdk.admin(),getDbCollections)

router.get('/admin/collection/:collection',auth.required,access('readAny','data'),sdk.admin(),adminCloverCollectionData)

router.post('/admin/addtocollection/:collection',auth.required,access('createAny','data'),sdk.admin(),adminCloverAddToCollection)

router.post('/admin/getfromwhere/:collection',auth.required,access('readAny','data'),sdk.admin(),adminCloverGetFromCollectionWhere)

router.get('/admin/getDocument/:collection/:document',auth.required,access('readAny','data'),sdk.admin(),adminCloverGetDocument)

// router.put('/admin/updateCloverConf/:collection/',auth.required,access('updateAny','data'),sdk.admin(),adminCloverUpdateConf)

router.put('/admin/updateDocument/:collection/:document',auth.required,access('readAny','data'),sdk.admin(),adminCloverUpdateDocument)

router.post('/admin/newsdk',auth.required,access('createAny','data'),sdk.admin(),adminCloverGenerateNewSdk)


router.delete('/admin/deleteDocument/:collection/:document',auth.required,access('deleteAny','data'),sdk.admin(),adminCloverDeleteDocument)

module.exports = router;
