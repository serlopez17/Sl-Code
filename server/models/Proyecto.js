const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const proyectoSchema = new Schema({
    nombre:{
        type: String,
        required:true
    },
    carpetaPadre:{
        type:Schema.Types.ObjectId, ref : 'Carpeta'
    },
    propietario:{
        type:Schema.Types.ObjectId, ref : 'Usuario'
    },
    estado:{
        type: Boolean,
        default: true
    },
    html:{
        type:Schema.Types.ObjectId, ref : 'Archivo'
    },
    css:{
        type:Schema.Types.ObjectId, ref : 'Archivo'
    },
    js:{
        type:Schema.Types.ObjectId, ref : 'Archivo'
    }
})

module.exports = mongoose.model('Proyecto',proyectoSchema);