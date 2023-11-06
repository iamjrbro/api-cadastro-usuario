const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js');
const usuarios = require('./usuariosRoutes.js');

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    usuarios
  )
};

