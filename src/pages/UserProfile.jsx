import React, { useState, useEffect } from 'react';
import './UserProfile.css';

export default function UserProfile() {
    const [formData, setFormData] = useState({
        nombre_usuario: '',
        nombre_real: '',
        correo: '',
        clave: '',
        nivel_ajedrez: '',
        id: '',
    });
    const [message, setMessage] = useState('');

    /*prueba, esta parte se maneja con la que tiene login page
    useEffect(() => {
        localStorage.setItem('usuario', 'julian12iu');
    }, []);
    */

    const updateUserProfile = async (data) => {
        const response = await fetch(`http://localhost:8080/chess-puzzles/resources/usuarios/usuarioid/${formData.nombre_usuario}/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombreUsuario: data.nombre_usuario,
                nombreReal: data.nombre_real,
                correo: data.correo,
                clave: data.clave,
                nivelAjedrez: data.nivel_ajedrez
            }),
        })
        localStorage.setItem('usuario',formData.nombre_usuario);
    };

    useEffect(() => {
        fetch('http://localhost:8080/chess-puzzles/resources/usuarios/todosusuarios')
            .then(res => res.json())
            .then(data => {
                const nombre_usuario = localStorage.getItem('usuario');
                const usuarioEncontrado = data.find(u => u.nombreUsuario === nombre_usuario);
                if (usuarioEncontrado) {
                    setFormData({
                        nombre_usuario: usuarioEncontrado.nombreUsuario,
                        nombre_real: usuarioEncontrado.nombreReal,
                        correo: usuarioEncontrado.correo,
                        clave: usuarioEncontrado.clave,
                        nivel_ajedrez: usuarioEncontrado.nivelAjedrez,
                        id: usuarioEncontrado.id,
                    });
                }
            })
            .catch(err => console.error('Error:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(formData);
            setMessage('Actualización exitosa ✅');
            //console.log(localStorage.getItem('usuario'));
        } catch (error) {
            setMessage('Actualización incorrecta ❌');
        }
    };

     useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className="profile-container">
            <h1>Ajustes</h1>
            <h2>Perfil</h2>
            <form className="profile-form" onSubmit={handleSubmit}>
                <label>
                    Usuario
                    <input name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} />
                </label>
                <label>
                    Nombre
                    <input name="nombre_real" value={formData.nombre_real} readOnly />
                </label>
                <label>
                    correo
                    <input name="correo" value={formData.correo} readOnly />
                </label>
                <label>
                    Contraseña
                    <input name="clave" value={formData.clave} readOnly />
                </label>
                <label>
                    Nivel de ajedrez
                    <input name="nivel_ajedrez" value={formData.nivel_ajedrez} readOnly />
                </label>
                <button type="submit">Guardar</button>
                {message && <div className="success-message">{message}</div>}
            </form>
        </div>
    );
}