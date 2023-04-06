const agenciaModel = require('../models/agencia')


// Get all information of the database
const getAllAgencia = async (req, res) => {
    try {
        const listAll = await agenciaModel.find({})
        res.status(200).json(listAll);
    } catch (e) {
        res.status(500)
        res.send({ error: 'Algo ocurrio' })
    }
};


// fillter information by Id
const getOneAgenciaById = async (req, res) => {
    try {
        const one = await agenciaModel.findById(req.params.id);
        res.status(200).json(one);
    } catch (e) {
        res.status(500)
        res.send({ error: 'Algo ocurrio' })
    }
};
// fillter information by Nmae
const getOneAgenciaByName = async (req, res) => {
    try {
        const one = await agenciaModel.find({ nombre: req.params.nombre });
        res.status(200).json(one);
    } catch (e) {
        res.status(500)
        res.send({ error: 'Algo ocurrio' })
    }
};

const getLookForNit= async (nit, res) => {
    try {
        const user = await agenciaModel.find({ nit: nit});
        if(!user){
            return true;
        }
    } catch (e) {
        res.status(500)
        res.send({ error: 'Algo ocurrio' })
        return "error"
    }
};

// create new registration in database
const createAgencia = async (idUser, req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const {  nit, razon_social, telefono, direccion, fecha_alta, fecha_baja, numero_inspectores, ciudad, codigo, stateAgent } = req.body;
        const registerUser = await agenciaModel.create({
            user:idUser,
            nit,
            razon_social,
            telefono,
            direccion,
            fecha_alta,
            fecha_baja,
            numero_inspectores,
            ciudad,
            codigo,
            state:stateAgent
        });
        res.status(200);
        return registerUser;
    } catch (e) {
        res.status(500);
        return "error"
    }
};

// update a registration of the database
const updateAgencia = async (req, res) => {
    try {
        const resUpdate = await agenciaModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json(resUpdate);
    } catch (e) {
        res.status(500)
        res.send({ error: 'Algo ocurrio' })
    }
    return false;
};
// delte a registration of the data base



module.exports = { getAllAgencia, getOneAgenciaById, createAgencia, updateAgencia, getOneAgenciaByName, getLookForNit }