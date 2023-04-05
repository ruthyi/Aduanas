const mongoose = require("mongoose");

const InspectorScheme = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    numero_cedula: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    codigo_auditor: {
      type: String,
      required: true,
      unique: true,
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

module.exports = mongoose.model("inspector", InspectorScheme);
