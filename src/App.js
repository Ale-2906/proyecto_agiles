// src/App.js

import React from 'react';
import './App.css';
import StudentRegistration from './Registro';

function App() {
  return (
    <div className="App">
      <header className='banner'>
      </header>
      <body className="banner-container">
        <h1>Estudiantes</h1>
      </body>
      <section className="App-main">
        <StudentRegistration />
      </section>
      <br />
      <footer className="App-footer">
        @CuartoSemestre
      </footer>
    </div>
  );
}

export default App;
