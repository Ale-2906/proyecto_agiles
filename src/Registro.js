import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registro.css';

const StudentRegistration = () => {
  const [student, setStudent] = useState({
    estudiante: '',
    carrera: '',
    tema: '',
    porcentaje: '',
    estado: ''
  });

  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/estudiantes')
      .then(response => {
        setStudentsData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the students!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/estudiantes', student)
      .then(response => {
        setStudentsData([...studentsData, student]);
        setStudent({ estudiante: '', carrera: '', tema: '', porcentaje: '', estado: '' });
      })
      .catch(error => {
        console.error('There was an error adding the student!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estudiante:</label>
          <input type="text" name="estudiante" value={student.estudiante} onChange={handleChange} required />
        </div>
        <div>
          <label>Carrera:</label>
          <select name="carrera" value={student.carrera} onChange={handleChange} required>
            <option value="">Selecciona una carrera</option>
            <option value="Software">Software</option>
            <option value="Telecomunicaciones">Telecomunicaciones</option>
            <option value="TI">TI</option>
            <option value="Robótica">Robótica</option>
          </select>
        </div>
        <div>
          <label>Tema:</label>
          <input type="text" name="tema" value={student.tema} onChange={handleChange} required />
        </div>
        <div>
          <label>Porcentaje:</label>
          <input type="text" name="porcentaje" value={student.porcentaje} onChange={handleChange} required />
        </div>
        <div>
          <label>Estado:</label>
          <select name="estado" value={student.estado} onChange={handleChange} required>
            <option value="">Selecciona el estado</option>
            <option value="Inicio">Inicio</option>
            <option value="Completo">Completo</option>
            <option value="Terminado">Terminado</option>
            <option value="Retirado">Retirado</option>
          </select>
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <br />
      <table className="styled-table">
        <thead>
          <tr>
            <th>Estudiante</th>
            <th>Carrera</th>
            <th>Tema</th>
            <th>Porcentaje</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student, index) => (
            <tr key={index}>
              <td>{student.estudiante}</td>
              <td>{student.carrera}</td>
              <td>{student.tema}</td>
              <td>{student.porcentaje}</td>
              <td>{student.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRegistration;
