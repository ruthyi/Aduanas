const userModel = require("../models/user");

// Listar usuario
const getInspector = async (req, res) => {
  try {
    const listAll = await userModel.find({});
    res.status(200).json(listAll);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};
//Listar usuarios por id
const getInspectorById = async (req, res) => {
  try {
    const one = await userModel.findById(req.params.id);
    res.status(200).json(one);
  } catch (e) {
    res.status(500);
    res.send({ error: "Algo ocurrio" });
  }
};

//Listar usuarios por name
const getInspectorByName = async (req, res) => {
  try {
    const one = await userModel.find({ name: req.params.user_name });
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
    const { user, numero_cedula,  nombre, apellido, telefono, direccion, codigo_auditor, state } = req.body;
 //TODO: (123456)<--- Encriptando!!
    const registerUser = await userModel.create({
      user,
      numero_cedula,
      nombre,
      apellido,
      telefono,
      direccion,
      codigo_auditor,
      state
    });
        res.status(200);
        res.send({ data: registerUser });

} catch (e) {
  res.status(500);
  res.send({ error: "Correo Ya Existente" });
}
};

//actualizar usuario
const updateInspector = async (req, res) => {
  const { user_name, email, role, state } = req.body;
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error al buscar el user" });
    }
    if (!user) {
      return res.status(404).json({ error: "El user no existe" });
    }
    user.user_name = user_name;
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

// Pendiente
const updateInspectorState = async (req, res) => {
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
    getInspector,
    getInspectorById,
    getInspectorByName,
    createInspector,
    updateInspector,
    updateInspectorState,
};
