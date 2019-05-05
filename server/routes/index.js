const express = require('express');
const app = express();

//app.use(require('./vistas'));
app.use(require('./usuarios'));
app.use(require('./carpetas'))
app.use(require('./proyectos'))

module.exports = app;