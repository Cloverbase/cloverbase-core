const express = require('express');
const auth = require('../../../auth');
const router = express.Router();
const { login, register,activate, resetPassword, forgetPassword } = require('../../../../controllers/usersController');
const activation = require('../../../activation');


//  ██████╗ ██╗       ██████╗  ██╗   ██╗ ███████╗ ██████╗  
// ██╔════╝ ██║      ██╔═══██╗ ██║   ██║ ██╔════╝ ██╔══██╗ 
// ██║      ██║      ██║   ██║ ██║   ██║ █████╗   ██████╔╝ 
// ██║      ██║      ██║   ██║ ╚██╗ ██╔╝ ██╔══╝   ██╔══██╗ 
// ╚██████╗ ███████╗ ╚██████╔╝  ╚████╔╝  ███████╗ ██║  ██║ 
//  ╚═════╝ ╚══════╝  ╚═════╝    ╚═══╝   ╚══════╝ ╚═╝  ╚═╝ 
// created by : Abdellatif Ahammad
// 



///@route User api/Users
///@desc Create an User 
// @access public
router.post('/singup', auth.optional, register);


//@router User api/users
//@desc activating account from email
//@access public
router.post('/activateAccount', activate);

//@router User api/users
//@desc activating account from email
//@access public
router.post('/resetPassword', resetPassword);

//@router User api/users
//@desc activating account from email
//@access public
router.post('/forgetPassword', forgetPassword);


//@router User api/users
//@desc login via passportjs
//@access public
router.post('/login',activation(), login);

module.exports = router ;