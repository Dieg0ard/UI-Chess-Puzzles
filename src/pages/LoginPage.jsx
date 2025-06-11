// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import logo from '../assets/register-image.jpg'; 

function LoginPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    clave: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/chess-puzzles/resources/usuarios/todosusuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioValido = usuarios.find(
      u => u.nombreUsuario === formData.nombre_usuario && u.clave === formData.clave
    );

    if (usuarioValido) {
      localStorage.setItem('usuario', formData.nombre_usuario);
    } else {
      setMessage('Credenciales incorrectas ❌');
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1 className="title">Chess Puzzles</h1>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <input
          type="text"
          name="nombre_usuario"
          placeholder="Usuario"
          value={formData.nombre_usuario}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="clave"
          placeholder="Contraseña"
          value={formData.clave}
          onChange={handleChange}
          required
        />

        <button type="submit">Entrar</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default LoginPage;