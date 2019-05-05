const express = require('express');
const app = express();
const bcrypt  = require('bcrypt');
const Usuario = require('../models/usuario');
const Proyecto  = require("../models/Proyecto")

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
            plan : usuario.plan,
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

app.get("/usuariosCompartir",async(req,res)=>{
    let idLog = req.session._id
    
    let usuarios= await Usuario.find({_id: {$ne: idLog }})
    console.log(usuarios)
    return res.send({
        status:200,
        data: usuarios
    })
});

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

app.post("/usuarios/compartir",async(req,res)=>{
    let usuarioCompartir = req.body.idUsuario;
    let carpetaCompartida = req.body.idCarpeta
    let usuarioCompartido = await Usuario.findByIdAndUpdate(usuarioCompartir,{$push:{ carpetasCompartidas:carpetaCompartida}})

    return res.send({
        carpetas:usuarioCompartido.carpetasCompartidas,
        status:200
    })
})

app.get("/compartir",async(req,res)=>{
    let id = req.session._id
    let usuario = await Usuario.findById(id)
    .populate({path:"carpetasCompartidas",select:"nombre _id"})

    let carpetas =  usuario.carpetasCompartidas
    return res.send({
        status:200,
        carpetas
    })
})

app.get("/logueado",verificarAutenticacion,async(req,res)=>{
    return res.send({
        id:req.session._id ,
        nombre:req.session.nombre, 
        nombreUsuario:req.session.nombreUsuario 
    })
})

module.exports = app