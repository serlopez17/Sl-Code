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
module.exports = {
    verificarAutenticacion
}
