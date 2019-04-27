const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:true
    },
    correo:{
        type:String,
        required:true
    },
    contrasena:{
        type:String,
        required:true
    },
    nombreUsuario:{
        type:String,
        required:true,
    }
})

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.contrasena;

    return userObject;
}


module.exports = mongoose.model('Usuario',usuarioSchema);