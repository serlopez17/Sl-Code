const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const carpetaSchema = new Schema({
    nombre:{
        type: String,
        required:true
    },
    propietario:{
        type:Schema.Types.ObjectId, ref : 'Usuario'
    },
    estado:{
        type: Boolean,
        default: true
    },
    carpetaPadre:{
        type:Schema.Types.ObjectId, ref : 'Carpeta'}
})

module.exports = mongoose.model('Carpeta',carpetaSchema);