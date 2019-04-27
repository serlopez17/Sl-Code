var express = require("express");
var app = express();
const path =require('path');
const hbs = require('hbs');

//app.use(express.static("public"));
//app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



//routes
app.use( require('./routes/index'));

require('./database');
app.listen(3333,function(){
    console.log("Servidor levantado");
});