const mongoose = require("mongoose");
const schema = mongoose.Schema;

const InspectorScheme = new mongoose.Schema({
    user: {
        type: schema.ObjectId,
        ref: "user",
        required: true,
    },
    numero_cedula: {
         type: Number,
         required: true
    },
    nombre:{
        type:String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        unique: true
    },
    direccion: {
        type: String,
        required: true,
        unique: true,
    },
    codigo_auditor: {
        type: Number,
        required: true,
        unique: true
    },
    state:{
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
        versionKey: false,
        resetPassword:false,
})



module.exports = mongoose.model('inspector', InspectorScheme)