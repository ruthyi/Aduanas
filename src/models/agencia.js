const mongoose = require("mongoose");
const schema = mongoose.Schema;

const AgenciaScheme = new mongoose.Schema(
  {
    user: {
      type: schema.ObjectId,
      ref: "user",
      required: true,
    },
    nit: {
      type: Number,
      required: true,
      unique: true,
    },
    razon_social: {
      type: String,
      required: true,
      unique: true,
    },
    telefono: {
      type: Number,
      required: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: true,
      unique: true,
    },
    fecha_alta: {
      type: Date,
      required: true,
    },
    fecha_baja: {
      type: Date,
      required: true,
    },
    numero_inspectores: {
      type: Number,
      required: true,
    },
    ciudad: {
      type: String,
      required: true,
    },
    codigo: {
      type: Number,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    resetPassword: false,
  }
);

module.exports = mongoose.model("agencia", AgenciaScheme);
