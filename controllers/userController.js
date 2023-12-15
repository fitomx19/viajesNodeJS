const userModel = require('../models/userModel');

const userController = {
  login: (req, res) => {
    res.render('login');
  },

  handleLogin: (req, res) => {
    const { correo, contra } = req.body;
  
    userModel.checkUser(correo, contra, (err, results) => {
      if (err) {
        console.error('Error al verificar las credenciales:', err);
        res.redirect('/login');
      } else {
        if (results.length > 0) {
          // Autenticación exitosa, establece la sesión
          req.session.user = { correo }; // Puedes agregar más información si es necesario
  
          res.redirect('/dashboard');
        } else {
          res.redirect('/login');
        }
      }
    });
  },
  

  register: (req, res) => {
    res.render('register');
  },

  handleRegister: (req, res) => {
    const { correo,nombre,apellido,contra } = req.body;

    userModel.createUser(correo,nombre,apellido,contra, (err, results) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        res.redirect('/register');
      } else {
        res.redirect('/login');
      }
    });
  },

  dashboard: (req, res) => {
    // Aquí puedes acceder a la información del usuario desde req.session.user

    userModel.getUser(req.session.user.correo, (err, results) => {
      if (err) {
        console.error('Error al obtener el usuario:', err);
        res.redirect('/login');
      } else {
        res.render('dashboard', { user: results[0] });
      }
    });
  },

  landing: (req, res) => {
    
    res.render('landing');
  },
  
  logout: (req, res) => {
    // Limpiar la sesión al cerrar sesión
    console.log("llegue aqui");
    req.session.destroy((err) => {
      if (err) {
        console.error('Error al cerrar sesión:', err);
      }
      res.redirect('/login');
    });
  },

  mostrarCompra: (req, res) => {
    const nombreUsuario = req.session.user; // Asegúrate de ajustar esto según cómo manejas las sesiones

    res.render('compra', { user: nombreUsuario });
  },

  procesarCompra: (req, res) => {
    const { cantidadPersonas, fechaViaje } = req.body;
    const nombreUsuario = req.session.user; // Asegúrate de ajustar esto según cómo manejas las sesiones

    // Aquí deberías procesar la información, por ejemplo, almacenarla en tu base de datos

    // Luego, puedes redirigir al usuario a una página de confirmación o a donde desees
    res.render('confirmacion', { user: nombreUsuario, cantidad: cantidadPersonas, fecha: fechaViaje });
  },

  
};

module.exports = userController;
