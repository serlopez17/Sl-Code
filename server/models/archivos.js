const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const archivoSchema = new Schema({
    nombre:{
        type: String,
        required:true
    },
    extension:{
        type:String,
        required:true
    },
    usuarioPropietario:{
        type:Schema.Types.ObjectId, ref : 'Usuario'
    },
    estado:{
        type:Boolean,
        default: true
    },
    ruta:{
        type: String,
        required: true
    },

    contenido:{
        type: String,
        required: true
    },

    carpeta:{
        type:Schema.Types.ObjectId, ref : 'Carpeta'  
    }
    

})


module.exports = mongoose.model('Usuario',usuarioSchema);