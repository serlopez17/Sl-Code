const express = require('express');
const app = express();
const bcrypt  = require('bcrypt');
const Usuario = require('../models/usuario');
const {verificarAutenticacion}=require('./midlewares')

app.post('/usuarios/crear',async(req,res)=>{
    let usuario = req.body;
    try {
        let usuarioEncontrado = await Usuario.findOne({$or:[{correo:usuario.correo},{nombreUsuario:usuario.nombreUsuario}]})
        if (usuarioEncontrado){
            return  res.send({
                mensaje:'Usuario ya existe',
                status:404
            })
        }
        let nuevoUsuario = new Usuario({
            nombre:usuario.nombre,
            correo: usuario.correo,
            nombreUsuario: usuario.nombreUsuario,
            contrasena:bcrypt.hashSync(usuario.contrasena,10)
        })
        let usuarioGuardado = await nuevoUsuario.save();
        return res.send({
            status: 200,
            usuario:usuarioGuardado,
            mensaje:'se ha creado el usuario'
        })
    } catch (error) {
        return res.send({
            status:500,
            error
        })
    }

});

app.get('/usuarios',verificarAutenticacion, async(req, res) =>{
    let usuarios = await Usuario.find();
    if (usuarios != 0){
        return res.send({
            status: 200,
            data: usuarios
        })
    }else{
        return res.send({
            status: 404,
            mensaje: 'No existen usuarios'
        })
    }
})

app.post('/usuarios/login', async(req, res) =>{
    let usuario = req.body;
    try {
        let usuarioLogin = await Usuario.findOne({ nombreUsuario: usuario.nombreUsuario })
        if (!usuarioLogin){
            return res.send({
                status:404,
                mensaje: 'Datos Incorrectos, Ingreselos de nuevo'
            })
        }
        if(!bcrypt.compareSync(usuario.contrasena, usuarioLogin.contrasena)){
            return res.send({
                status:404,
                mensaje: 'Datos Incorrectos, Ingreselos de nuevo'
            })
        }

        req.session._id = usuarioLogin._id;
        req.session.nombre = usuarioLogin.nombre
        req.session.nombreUsuario = usuarioLogin.nombreUsuario;

        return res.send({
            status: 200,
            mensaje: 'login exitoso',
            data: usuarioLogin
        })



    } catch (error) {
        
    }
})

module.exports = app