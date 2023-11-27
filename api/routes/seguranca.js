const { Router } = require('express');
const router = Router()
const segurancaController = require('../controllers/segurancaController.js')

router
    .post('/seguranca/acl', segurancaController.cadastrarAcl)

module.exports(router);
