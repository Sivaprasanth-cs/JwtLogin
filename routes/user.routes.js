const express = require('express');
const controller = require('../controllers/user.controller');
const router = express.Router();


router.post('/register',controller.registeruser);

router.post('/login',controller.loginuser);



module.exports = { userRouter: router };