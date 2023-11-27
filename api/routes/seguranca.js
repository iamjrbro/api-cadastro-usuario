const { Router } = require('express');
const router = Router()
const segurancaController = require('../controllers/segurancaController.js')

router
    .post('/seguranca/acl', segurancaController.cadastrarAcl)
    .post('/seguranca/permissoes-roles', segurancaController.cadastrarPermissoesRoles)

module.exports(router);
