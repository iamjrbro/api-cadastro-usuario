const { Router } = require('express');
const rolesController = require('../controllers/rolesController.js')

const router = Router();

router
    .post('/roles', rolesController.cadastrar)
    .get('/roles', rolesController.buscarTodasRoles)
    .get('/roles/:id', rolesController.buscarRolesPorId)
    .delete('/roles/:id', rolesController.deletarRolesPorId)
    .put('/roles/:id', rolesController.editarRole)

module.exports(router);
