import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './RegisterPage.css';
import logo from '../assets/register-image.jpg';

function RegisterPage() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nombre_usuario: '',
    nombre_real: '',
    correo: '',
    clave: '',
    nivel_ajedrez: 1,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/chess-puzzles/resources/usuarios/usuario/${formData.nombre_usuario}/${formData.nombre_real}/${formData.correo}/${formData.clave}/${formData.nivel_ajedrez}`;

    try {
      const res = await fetch(url, { method: 'POST' });
      if (res.ok) {
        navigate('/login'); // 
      } else {
        setMessage('Error al registrar ❌');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error de red ❌');
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <img src={logo} alt="Logo" className="register-logo" />
        <h1 className="title">Chess Puzzles</h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>

        <input
          type="text"
          name="nombre_usuario"
          placeholder="Usuario"
          value={formData.nombre_usuario}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="nombre_real"
          placeholder="Nombre"
          value={formData.nombre_real}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="correo"
          placeholder="Email"
          value={formData.correo}
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

        <select
          name="nivel_ajedrez"
          value={formData.nivel_ajedrez}
          onChange={handleChange}
          required
        >
          <option value={1}>Debutante</option>
          <option value={2}>Intermedio</option>
          <option value={3}>Avanzado</option>
        </select>

        <button type="submit">Crear cuenta</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;