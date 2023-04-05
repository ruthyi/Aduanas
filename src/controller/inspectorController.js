const inspectorModel = require("../models/inspector");

// Listar usuario
const getInspector = async (req, res) => {
  try {
    const listAll = await inspectorModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};
//Listar usuarios por id
const getInspectorById = async (req, res) => {
  try {
    const one = await inspectorModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Listar usuarios por name
const getInspectorByEmail = async (req, res) => {
  try {
    const one = await inspectorModel.find({ name: req.params.email });
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Crear usuario 
const createInspector = async (req, res) => {
  try {
    //TODO: Datos que envias desde el front (postman)
    const {  numero_cedula, nombre,  apellido, telefono, direccion,codigo_auditor, state } = req.body;
    const registerUser = await inspectorModel.create({
      telefono,
      numero_cedula,
      nombre,
      apellido,
      direccion,
      codigo_auditor,
      state
    });

        res.status(200);
        res.send({ data: registerUser });

} catch (e) {
  console.log(e); 
  if (e.name === 'MongoError' && e.code === 11000) {
    res.status(500);
    res.send({ error: "Correo Ya Existente" });
  } else {
    res.status(500);
    res.send({ error: "Ha ocurrido un error al registrar al Inspector" });
  }
}
};

//actualizar usuario
const updateInspector = async (req, res) => {
  const {  email, role, state } = req.body;
  const id = req.params.id;
  inspectorModel.findById(id, (err, user) => {
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
const updateInspectorState = async (req, res) => {
  const id = req.params.id;
  const state = req.body.state;
  inspectorModel.findById(id, (err, user) => {
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
  getInspector,
  getInspectorById,
  createInspector,
  updateInspector,
  updateInspectorState,
  getInspectorByEmail,
};
