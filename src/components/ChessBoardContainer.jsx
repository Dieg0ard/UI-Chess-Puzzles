import React, { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { Link } from "react-router-dom";

const ChessBoardContainer = () => {
  const [fen, setFen] = useState("start");
  const [puzzleMoves, setPuzzleMoves] = useState([]);
  const [userColor, setUserColor] = useState("w");
  const [puzzleId, setPuzzleId] = useState(null);
  const [game, setGame] = useState(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  const fetchRandomPuzzle = async () => {
    const randomId = Math.floor(Math.random() * 50) + 1;
    console.log(`🎯 Cargando puzzle con ID: ${randomId}`);
    setPuzzleId(randomId);

    try {
      const response = await fetch(
        `http://localhost:8080/chess-puzzles/resources/puzzles/puzzleid/${randomId}`
      );
      const data = await response.json();

      const chess = new Chess();
      chess.load(data.FEN);
      setGame(chess);
      setPuzzleMoves(data.movimientos);
      setFen(data.FEN);

      const currentTurn = data.FEN.split(" ")[1];
      const playerColor = currentTurn === "w" ? "b" : "w";
      setUserColor(playerColor);
      setCurrentMoveIndex(1);

      setTimeout(() => {
        const move = data.movimientos[0];
        const from = move.slice(0, 2);
        const to = move.slice(2, 4);
        const promotion = move.length === 5 ? move[4] : undefined;

        chess.move({ from, to, promotion });
        setFen(chess.fen());
      }, 500);
    } catch (err) {
      console.error("Error al cargar el puzzle:", err);
    }
  };

  useEffect(() => {
    fetchRandomPuzzle();
  }, []);

  const handlePuzzleSolved = () => {
    console.log("✅ Puzzle resuelto");
    setSolvedCount((prev) => prev + 1);
    setTimeout(() => {
      fetchRandomPuzzle();
    }, 100);
  };

  if (!game) return <p>Cargando...</p>;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        textAlign: "center"
      }}
    >
      {/* Contenedor de botones */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          gap: "10px"
        }}
      >
        <button
          onClick={fetchRandomPuzzle}
          style={{
            padding: "8px 12px",
            backgroundColor: "#fff",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Nuevo puzzle
        </button>
        <Link to="/profile">
          <button
          style={{
            padding: "8px 12px",
            backgroundColor: "#fff",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Perfil
        </button>
        </Link>
        
      </div>

      <div style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "50px" }}>
        Puzzles resueltos: {solvedCount}
      </div>

      <ChessBoard
        fen={fen}
        game={game}
        puzzleMoves={puzzleMoves}
        userColor={userColor}
        currentMoveIndex={currentMoveIndex}
        setFen={setFen}
        setGame={setGame}
        setCurrentMoveIndex={setCurrentMoveIndex}
        onPuzzleSolved={handlePuzzleSolved}
        puzzleId={puzzleId}
      />
    </div>
  );
};

export default ChessBoardContainer;
