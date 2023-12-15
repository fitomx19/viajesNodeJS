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
    } else {
      console.log('Conexión exitosa a MySQL');
    }
  });
}

const userModel = {
  checkUser: (correo, contra, callback) => {
    const checkUserQuery = 'SELECT * FROM users WHERE correo = ? AND contra = ?';
    db.query(checkUserQuery, [correo, contra], callback);
  },

  createUser: (correo, nombre, apellido, contra, callback) => {
    const insertUserQuery = 'INSERT INTO users (correo, nombre, apellido, contra) VALUES (?, ?, ?, ?)';
    db.query(insertUserQuery, [correo, nombre, apellido, contra], callback);
  },

  getUser: (correo, callback) => {
    const getUserQuery = 'SELECT * FROM users WHERE correo = ?';
    db.query(getUserQuery, [correo], callback);
  },
};

module.exports = userModel;
