const userModel = require("../models/user");
const agencia = require('../services/agencia');
const user = require('../services/user');
const inspector = require('../services/inspector');


// Listar usuario
const getUsers = async (req, res) => {
  try {
    const listAll = await userModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};
//Listar usuarios por id
const getUserById = async (req, res) => {
  try {
    const one = await userModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Listar usuarios por name
const getUserByEmail = async (req, res) => {
  try {
    const one = await userModel.find({ name: req.params.email });
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Crear usuario 
const createUser = async (req, res) => {

  const { role } = req.body;
  if (role === "agencia") {
    const use = await user.createUser(req, res)
    if (use != "error") {
      const idUser = use._id;
      const agen = await agencia.createAgencia(idUser, req, res)
      if (agen != "error") {
        res.send({ data: { use, agen } });
      }
    }

  } else if (role === "inspector") {
    const use = await user.createUser(req, res)
    if (use != "error") {
      const idUser = use._id;
      const insp = await inspector.createInspector(idUser, req, res)
      if (insp != "error") {
        res.send({ data: { use, insp } });
      }
    }

  } else if (role == "superAdmin") {

    const use = await user.createUser(req, res)
    if (use != "error") {
      res.send({ data: { use } });
    }
  
  } else {
    res.status(500);
    res.send({ error: "Rol Erroneo" });
  }


};

//actualizar usuario
const updateUser = async (req, res) => {
  const { email, role, state } = req.body;
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }
    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.email = email;
    user.role = role;
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

//Actualizar estado del usuario
const updateUserState = async (req, res) => {
  const id = req.params.id;
  const state = req.body.state;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }

    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.state = state;
    user.save((err, userActualizado) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar el user" });
      }
      res.status(200);
      res.json(userActualizado);
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserState,
  getUserByEmail,
};
