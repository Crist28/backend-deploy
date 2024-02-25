const { Router } = require("express")

const clienteController = require('../controllers/ClienteController');

const router = Router();

router.post('/registro_cliente', clienteController.registro_cliente);
router.post('/login_cliente', clienteController.login_cliente);
router.get('/clientes', clienteController.obtenerClientes);

module.exports = router;