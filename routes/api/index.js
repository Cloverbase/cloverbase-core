// inside here decalring the routes that I will use 
// Abdellatif Ahammad

const express = require('express');
const router = express.Router();

// router.use('/users', require('./users/users'));
router.use('/clover',require('./v1/clover'))
router.use('/clover_storage',require('./v1/storage'))
router.use('/users',require('./v1/users'))
module.exports = router;