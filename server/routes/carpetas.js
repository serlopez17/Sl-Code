const express = require('express');
const app = express();
const Carpeta = require("../models/carpetas")

app.post("/carpetas/crear",async (req,res)=>{
    let nombre  = req.body.nombre;
    let idCarpetaPadre= req.body.idCarpetaPadre
    let propietario = req.session._id
    if(idCarpetaPadre!=undefined){
        let carpeta = new Carpeta({
            nombre,
            propietario
        })
        let carpetaCreada = await carpeta.save()
    
        return res.send({
            status:200,
            carpeta : carpetaCreada
        })
    }else{
        let carpeta = new Carpeta({
            nombre,
            propietario,
            carpetaPadre:idCarpetaPadre
        })
        let carpetaCreada = await carpeta.save()
    
        return res.send({
            status:200,
            carpeta : carpetaCreada
        })
    }
})

app.get("/carpetas",async(req,res)=>{
    let id = req.session._id
    let carpetas = await Carpeta.find({$and:[{propietario:id},{estado:true}]})

    if(carpetas.length===0){
        return res.send({
            status:404,
            carpetas,
            mensaje:"No se encontraron carpetas"
        })
    }else{
        return res.send({
            status:200,
            carpetas
        })
    }
})

app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect("login.html");
});


module.exports=app