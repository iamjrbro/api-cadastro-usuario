const { Router } = require('express');
const rolesController = require('../controllers/rolesController.js')

const router = Router();

router
    .post('/roles', rolesController.cadastrar )
    .get('/roles')
    .get('/roles/:id')
    .delete('/roles/:id')
    .put('/roles/:id')

module.exports(router);
