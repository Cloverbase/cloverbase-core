// inside here decalring the routes that I will use 
// Abdellatif Ahammad

const express = require('express');
const router = express.Router();

// router.use('/users', require('./users/users'));
router.use('/clover',require('./clover/index'))

module.exports = router;