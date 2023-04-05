const express = require('express')
const router = express.Router()
// const checkAuth = require('../../middleware/auth')
// const checkRoleAuth = require('../../middleware/role')
// const {validateCreateUser}=require('../../validators/users');
// const {validateUpdateUser}=require('../../validators/userPutAll');
// const {validateCreatePutUser}=require('../../validators/putUser');

const {getInspector, getInspectorById, createInspector, updateInspector, updateInspectorState, getInspectorByEmail} = require('../../controller/inspectorController');



router.get('/',getInspector)

router.get('/:id', getInspectorById)

router.get('/email/:email', getInspectorByEmail)

router.post('/',  createInspector)

router.put('/:id',  updateInspector)

router.put( '/state/:id', updateInspectorState)

module.exports = router