import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="container">
      {/* Parte Izquierda */}
      <div className="left-panel">
        <h1 className="title">Chess Puzzles</h1>
        <p><em>Plataforma de entreamiento de ajedrez</em></p>
        <button className="button">Login</button>
        <button className="button">Registrarse</button>
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
