const { json } = require('body-parser');
const express = require('express');
// const auth = require('../../auth');
const router = express.Router();
var path = require('path');


router.get('/',(req,res)=>{
    return res.json({grating:"hello this is clover !"})
})

module.exports = router;