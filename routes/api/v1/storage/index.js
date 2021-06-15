const express = require('express');
const router = express.Router();
const auth = require('../../../auth');
const { uploadFile, uploadMultipleFiles, serveFiles, deleteFile, totalStoredFiles } = require('../../../../controllers/storageController');
const { upload } = require('../../../../services/storage');
const rules = require('../../../rules');
const access = require('../../../access');
const sdk = require('../../../sdk');


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 

// storage 
// upload single file 

router.post('/uploadfile', rules.storage, upload.single('myFile'),uploadFile )

// upload multiple files 
router.post('/uploadmultiple', rules.storage, upload.array('myFiles', 12),uploadMultipleFiles )


router.get('/uploads/:file',serveFiles)


router.delete('/deletefile/:file',rules.storage,deleteFile)


router.get('/total',auth.required,access('readAny','data'),sdk.admin(),totalStoredFiles)

module.exports = router;