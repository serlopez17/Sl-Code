const express = require('express');
const app = express();
const bcrypt  = require('bcrypt');
const Usuario = require('../models/usuario');

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

app.get('/usuarios', async(req, res) =>{
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

module.exports = app