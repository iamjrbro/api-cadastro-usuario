const { Router } = require('express')
const router = Router()
const PermissoesController = require('../controllers/permissoesController.js')

router
 .post('/permissoes', PermissoesController.cadastrar)
 .get('permissoes', PermissoesController.buscarTodasPermissoes)
 .get('/permissoes/:id', PermissoesController.buscarPermissoesPorId)
 .delete('/permissoes/:id', PermissoesController.deletarPermissoesPorId)
 .put('/permissoes/:id', PermissoesController.editarPermissoes)

 module.exports = router;
