const bodyParser = require('body-parser')
 
const produto = require('./produtoRoute.js');
const usuarios = require('./usuariosRoutes.js');
const auth = require('../routes/authRoute.js')
const seguranca = require('../routes/seguranca.js')
const roles = require('../routes/rolesRoutes.js');
const permissoes = require('../routes/permissoesRoutes.js')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    seguranca,
    usuarios,
    roles,
    produto,
    permissoes
  )
};

