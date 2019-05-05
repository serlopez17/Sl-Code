const express = require('express');
const app = express();
const Proyecto  = require("../models/Proyecto")
const Archivo = require("../models/archivos")
const {tipoPlan,verificarAutenticacion}=require('./midlewares')



app.post("/proyectos/crear",[tipoPlan, verificarAutenticacion],async (req,res)=>{
    let nombre  = req.body.nombre;
    let idCarpetaPadre= req.body.idCarpetaPadre
    let propietario = req.session._id 
    let arcivoHtml = new Archivo({
        extension:"html",
        propietario,
        contenido:"<h1>Hello World</h1>"

    })
    let arcivoCss = new Archivo({
        extension:"css",
        propietario,
        contenido:"hello"

    })
    let arcivoJs = new Archivo({
        extension:"js",
        propietario,
        contenido:"hello"

    })
    let html =  await arcivoHtml.save();
    let css =  await arcivoCss.save();
    let js =  await arcivoJs.save();

    if(idCarpetaPadre==""){
        let proyecto = new Proyecto({
            nombre,
            propietario,
            html:html._id,
            css:css._id,
            js: js._id
        })
        let proyectoCreado = await proyecto.save()
    
        return res.send({
            status:200,
            proyecto : proyectoCreado
        })
    }else{
        let proyecto = new Proyecto({
            nombre,
            propietario,
            carpetaPadre:idCarpetaPadre,
            html:html._id,
            css:css._id,
            js: js._id

        })
        let proyectoCreado = await proyecto.save()
    
        return res.send({
            status:200,
            proyecto : proyectoCreado
        })
    }
})


app.get("/proyectos",async(req,res)=>{
    let id = req.session._id
    
        var proyectos= await Proyecto.find({$and:[{propietario:id},{estado:true}]})
    

    if(proyectos.length===0){
        return res.send({
            status:404,
            proyectos,
            mensaje:"No se encontraron proyectos"
        })
    }else{
        return res.send({
            status:200,
            proyectos
        })
    }
})

app.post("/proyectos",async(req,res)=>{
    let id = req.session._id
    let idCarpetaPadre = req.body.idCarpetaPadre
    

    if(idCarpetaPadre===undefined){
        var proyectos = await Proyecto.find({$and:[{propietario:id},{estado:true},{carpetaPadre:{$exists:false}}]})
    }else{
        var proyectos= await Proyecto.find({$and:[{propietario:id},{estado:true},{carpetaPadre:idCarpetaPadre}]})
    }

    if(proyectos.length===0){
        return res.send({
            status:404,
            proyectos,
            mensaje:"No se encontraron proyectos"
        })
    }else{
        return res.send({
            status:200,
            proyectos
        })
    }
})

app.get("/proyectosRaiz",async(req,res)=>{
    let id = req.session._id
    var proyectos = await Proyecto.find({$and:[{propietario:id},{estado:true},{carpetaPadre:{$exists:false}}]})
    return res.send({
        status:200,
        proyectos
    })
})

app.post("/abrirProyecto",async(req,res)=>{
    req.session.idProyecto = req.body.idProyecto
    console.log(req.session.idProyecto)
    res.send({
        status:200
    })
})

app.get("/llenarEditor",async(req,res)=>{
    let idProyecto = req.session.idProyecto
    let proyecto = await Proyecto.findById(idProyecto,{html:1,css:1,js:1,nombre:1})
    .populate({path:"html",select:"contenido _id"})
    .populate({path:"css",select:"contenido _id"})
    .populate({path:"js",select:"contenido _id"})

    return res.send({
        status:200,
        proyecto
    })
})

app.post("/guardar",async(req,res)=>{
    let idProyecto = req.session.idProyecto
    let html =req.body.html
    let css = req.body.css
    //let js = req.body.js
    let contenidoHtml = req.body.contenidoHtml
    let contenidoCss = req.body.contenidoCss
    //let contenidoJs = req.body.contenidoJs
    let htmlUpdate = await Archivo.findByIdAndUpdate(html, {contenido:contenidoHtml},{new:true})
    let cssUpdate = await Archivo.findByIdAndUpdate(css, {contenido:contenidoCss},{new:true})

    console.log(htmlUpdate)
    //let jsUpdate = await Archivo.findByIdAndUpdate(js, {contenido:contenidoJs},{new:true})
    return res.send({
        status: 200
    })


})



module.exports = app;