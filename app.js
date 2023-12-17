const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const app = express();


app.use(express.static('public')); 


app.use(session({
  secret: 'viajes',  
  resave: true,
  saveUninitialized: true,
}));

app.engine('handlebars', exphbs.engine({
   
  defaultLayout: null,
  extname: 'handlebars'
})
);

app.set('view engine', 'handlebars');
 


app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
