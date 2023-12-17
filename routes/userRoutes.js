const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rutas de autenticación
router.get('/login', userController.login);
router.post('/login', userController.handleLogin);

router.get('/register', userController.register);
router.post('/register', userController.handleRegister);

// Ruta protegida para el dashboard
router.get('/dashboard', authenticateUser, userController.dashboard);

router.get('/logout', userController.logout);

router.get('/', userController.landing)

router.get('/viajes', authenticateUser, userController.mostrarViajes)


// Función para verificar la autenticación del usuario
function authenticateUser(req, res, next) {
  
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

// Ruta para mostrar el modal de compra
router.get('/compra', userController.mostrarCompra);

// Ruta para procesar el formulario de compra
router.post('/procesar-compra', userController.procesarCompra);

module.exports = router;
