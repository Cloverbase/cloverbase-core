// inside here decalring the routes that I will use 
// Abdellatif Ahammad

const express = require('express');
const router = express.Router();

// router.use('/users', require('./users/users'));
router.use('/clover',require('./clover/index'))
router.use('/clover_storage',require('./storage/index'))
router.use('/users',require('./users'))
module.exports = router;