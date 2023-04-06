const express = require('express')
const router = express.Router()
// const {validateCreate}=require('../../validators/logins');
// const {validateCreateUser}=require('../../validators/register');
// const {validateForgot}=require('../../validators/forgotPassword');
const { loginCtrl } = require('../../controller/loginController')
const {forgotCtrl } = require('../../controller/forgotController')
const {recoveryCtrl } = require('../../controller/recoveryController')
// const checkFailedLoginAttempts = require('../../middleware/failedLoginAttempts')
// const checkEmail= require('../../middleware/tokenForgot')


router.post('/',  loginCtrl)


router.post('/forgot-password',  forgotCtrl)


router.post('/password-recovery', recoveryCtrl)



module.exports = router
