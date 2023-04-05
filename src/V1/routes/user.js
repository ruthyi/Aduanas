const express = require('express')
const router = express.Router()
// const checkAuth = require('../../middleware/auth')
// const checkRoleAuth = require('../../middleware/role')
// const {validateCreateUser}=require('../../validators/users');
// const {validateUpdateUser}=require('../../validators/userPutAll');
// const {validateCreatePutUser}=require('../../validators/putUser');

const {getUsers, getUserById, createUser, updateUser, updateUserState, getUserByName} = require('../../controller/userController');



router.get('/',getUsers)

router.get('/:id', getUserById)

router.get('/name/:name', getUserByName)

router.post('/',  createUser)

router.put('/:id',  updateUser)

router.put( '/state/:id', updateUserState)

module.exports = router