const express = require('express');
const router = express.Router();
const auth = require('../../auth');
const { uploadFile, uploadMultipleFiles } = require('../../../controllers/storageController');
const { upload } = require('../../../services/storage');


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

router.post('/uploadfile',auth.required, upload.single('myFile'),uploadFile )

// upload multiple files 
router.post('/uploadmultiple',auth.required, upload.array('myFiles', 12),uploadMultipleFiles )


module.exports = router;