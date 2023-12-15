const mysql = require('mysql');

const db = mysql.createConnection({
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
  

const userModel = {
  checkUser: (correo, contra, callback) => {
    console.log(correo, contra);
    const checkUserQuery = 'SELECT * FROM users WHERE correo = ? AND contra = ?';
    db.query(checkUserQuery, [correo, contra], callback);
  },

  createUser: (correo, nombre, apellido, contra, callback) => {
    console.log(correo, nombre, apellido, contra);
    const insertUserQuery = 'INSERT INTO users (correo, nombre,apellido,contra) VALUES (?, ?, ?, ?)';
    db.query(insertUserQuery, [correo, nombre, apellido,contra], callback);
  },

getUser: (correo, callback) => {
    const getUserQuery = 'SELECT * FROM users WHERE correo = ?';
    db.query(getUserQuery, [correo], callback);
},
};

module.exports = userModel;
