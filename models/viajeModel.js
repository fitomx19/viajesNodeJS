const mysql = require('mysql');

let db;

// Verifica si estás en Heroku
if (process.env.JAWSDB_URL) {
  // Configuración de la base de datos proporcionada por JawsDB en Heroku
  db = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  // Configuración local de MySQL
  db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'kinect123',
    database: 'viajes',
  });

  db.connect((err) => {
    if (err) {
      console.error('Error al conectar a MySQL:', err);
      throw err; // Lanzar el error para indicar que la conexión ha fallado
    } else {
      console.log('Conexión exitosa a MySQL');
    }
  });
}

const viajeModel = {
  guardarCompra: (idUsuario, fechaViaje, cantidadPersonas, precio, callback) => {
    const guardarCompraQuery = 'INSERT INTO viajes (iduser, fecha, cantidadPersonas, precio) VALUES (?, ?, ?, ?)';
    db.query(guardarCompraQuery, [idUsuario, fechaViaje, cantidadPersonas, precio], (err, results) => {
      if (err) {
        console.error('Error al guardar la compra:', err);
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};

module.exports = viajeModel;
