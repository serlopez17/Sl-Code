const Usuario = require('../models/usuario');
const Proyecto = require('../models/Proyecto');


let verificarAutenticacion = (req,res,next) => {
    if(req.session._id) {
        return next();
    } else {
        res.send({
            mensaje:'Acceso no autorizado',
            status:401
        })
    }
}

const tipoPlan = async (req,res,next)=>{
    var id = req.session._id;
    let usuario = await Usuario.findById(id, { plan: 1 });
    let proyectosUsuario = await Proyecto.countDocuments({ propietario: id });
    if(usuario.plan == 2){
        return next()
    } else if (usuario.plan == 1){
        if(proyectosUsuario < 5){
            return next()
        }else(
            res.send({
                status: 202,
                mensaje:"Ha excedido el limite de proyecto por su plan"
            })

            
        )
    } else if(usuario.plan == 0 ){
        if(proyectosUsuario < 3){
            return next()
        }else{
            
            res.send({
                status: 202,
                mensaje:"Ha excedido el limite de proyecto por su plan"
            })
        }
    }
}


module.exports = {
    verificarAutenticacion,
    tipoPlan
}
