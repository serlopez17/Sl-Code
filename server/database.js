const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/slcode', {
    useCreateIndex: true,
    useNewUrlParser: true
  },(error) => {
    if (error) throw error;
    console.log('Base de Datos Online')
});
