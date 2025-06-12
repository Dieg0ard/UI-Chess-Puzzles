import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container">
      {/* Parte Izquierda */}
      <div className="left-panel">
        <h1 className="title">Chess Puzzles</h1>
        <p><em>Plataforma de entreamiento de ajedrez</em></p>
        <Link to="/login">
         <button className="button">Iniciar Sesión</button>
        </Link>
       <Link to="/register">
       <button className="button">Registrarse</button>
       </Link>
       <Link to ="/game">
       <button className="button">Invitado</button>
       </Link>
        
      </div>

      {/* Parte Derecha */}
      <div className="right-panel">
        <img
          src="src/assets/chess-draw.jpg"
          alt="Imagen de ejemplo"
          className="image"
        />
      </div>
    </div>
  );
}
