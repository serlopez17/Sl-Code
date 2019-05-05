var express = require("express");
var app = express();
const path =require('path');
const hbs = require('hbs');
const cookieParser=require('cookie-parser');
const session = require('express-session');


//app.use(express.static("public"));
//app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret:'sergioLopez12345678',resave:true,saveUninitialized:true}))

//routes
app.use( require('./routes/index'));

require('./database');
app.listen(3333,function(){
    console.log("Servidor levantado");
});