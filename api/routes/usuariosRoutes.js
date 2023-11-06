const { Router } = require('express');
const usuarioController = require('../controllers/usuariosController.js');
const router = Router()
const autenticado = require('../middleware/autenticado.js')

router.use(autenticado)


router
    .post('/usuarios', usuarioController.cadastrar)
    .get('usuarios')
    .get('/usuarios/id/:id')
    .put('/usuarios/id/:id')
    .delete('/usuarios/id/:id')

module.exports = router;

