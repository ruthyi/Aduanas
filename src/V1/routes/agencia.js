const express = require('express')
const router = express.Router()
// const checkAuth = require('../../middleware/auth')
// const checkRoleAuth = require('../../middleware/role')
// const {validateCreateUser}=require('../../validators/users');
// const {validateUpdateUser}=require('../../validators/userPutAll');
// const {validateCreatePutUser}=require('../../validators/putUser');

const { getAllAgencia,
    getOneAgenciaById,
    getOneAgenciaByName,
    createAgencia,
    updateAgencia
} = require('../../controller/agenciaController')




router.get("/", getAllAgencia);


router.get("/:id", getOneAgenciaById)


router.get("/name/:nombre", getOneAgenciaByName)


router.post("/", createAgencia)


router.put("/:id", updateAgencia)



module.exports = router;