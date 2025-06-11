import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";

const ChessBoard = () => {
  const [fen, setFen] = useState("start");

  useEffect(() => {
    const fetchRandomPuzzle = async () => {
      const randomId = Math.floor(Math.random() * 50) + 1; // ID entre 1 y 50
      try {
        const response = await fetch(`http://localhost:8080/chess-puzzles/resources/puzzles/puzzleid/${randomId}`);
        const data = await response.json();
        setFen(data.FEN);
      } catch (error) {
        console.error("Error al cargar el puzzle:", error);
      }
    };

    fetchRandomPuzzle();
  }, []);

  return (
    <div>
      <Chessboard position={fen} boardWidth={400} />
    </div>
  );
};

export default ChessBoard;
