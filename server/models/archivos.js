const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const archivoSchema = new Schema({
    nombre:{
        type: String,
        default:"index"
    },
    extension:{
        type:String,
        required:true
    },
    propietario:{
        type:Schema.Types.ObjectId, ref : 'Usuario'
    },
    estado:{
        type:Boolean,
        default: true
    },
    contenido:{
        type: String,
        required: true
    },
    // carpeta:{
    //     type:Schema.Types.ObjectId, ref : 'Carpeta'  
    // }
})

module.exports = mongoose.model('Archivo',archivoSchema);