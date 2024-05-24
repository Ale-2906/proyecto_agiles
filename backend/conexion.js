// conexion.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Reemplaza con tu contraseña de MySQL
  database: 'agiles' // Reemplaza con el nombre de tu base de datos
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL server.');
});

// Ruta para obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
  const query = 'SELECT * FROM estudiantes';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching students:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Ruta para agregar un nuevo estudiante
app.post('/estudiantes', (req, res) => {
  const { estudiante, carrera, tema, porcentaje, estado } = req.body;
  const query = 'INSERT INTO estudiantes (estudiante, carrera, tema, porcentaje, estado) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [estudiante, carrera, tema, porcentaje, estado], (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      res.status(500).send(err);
    } else {
      res.status(201).send('Student added successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
