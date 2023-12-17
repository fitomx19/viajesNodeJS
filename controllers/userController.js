const userModel = require('../models/userModel');
const viajeModel = require('../models/viajeModel');

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
    const { correo, nombre, apellido, contra } = req.body;

    userModel.createUser(correo, nombre, apellido, contra, (err, results) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            res.redirect('/register');
        } else {
            // Renderizar la página de éxito
            res.render('registroExitoso', { correo, nombre, apellido });
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
    const { cantidadPersonas, fechaViaje, precio } = req.body;
    
    console.log(req.body);
    // Verificar que cantidadPersonas y precio sean números válidos
    if (isNaN(cantidadPersonas) || isNaN(precio)) {
        return res.render('error', { error: 'Cantidad de personas o precio inválido.' });
    }
    
    // Calcular el precio total
    let precioTotal = parseInt(cantidadPersonas) * parseInt(precio);

    // Obtener el usuario desde el modelo
    userModel.getUser(req.session.user.correo, (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.redirect('/login');
        }

        // Extraer el id del usuario de los resultados
        const idUsuario = results[0].iduser;

        // Guardar la compra en el modelo de viaje
        viajeModel.guardarCompra(idUsuario, fechaViaje, cantidadPersonas, precioTotal, (err) => {
            if (err) {
                // Manejo de errores, redirigir a una página de error
                return res.render('error', { error: 'Error al procesar la compra.' });
            }

            // Compra exitosa, redirigir al usuario a una página de confirmación
            return res.render('confirmacion', { user: req.session.user, cantidad: cantidadPersonas, fecha: fechaViaje });
        });
    });
},

  

  mostrarViajes: (req, res) => {
  
    userModel.getUser(req.session.user.correo, (err, results) => {
      if (err) {
        console.error('Error al obtener el usuario:', err);
        res.redirect('/login');
      } else {
        
         
        
        const idUsuario = results[0].iduser;
        
        viajeModel.obtenerViajes(idUsuario, (err,results) => {
          if (err) {
           
            res.render('error', { error: 'Error al obtener el usuario.' });
          } else {
            console.log(results);
            res.render('misViajes', {  viajes: results});
          }
        });
      }
    }); 
   
  },

  
  
};

module.exports = userController;
