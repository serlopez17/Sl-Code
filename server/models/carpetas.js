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
    usuariosInvitados:[{
        type:Schema.Types.ObjectId, ref : 'Usuario'
    }],
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

module.exports = mongoose.model('Carpeta',carpetaSchema);