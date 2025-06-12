import React from "react";
import { Chessboard } from "react-chessboard";

const ChessBoard = ({
  fen,
  game,
  puzzleMoves,
  userColor,
  currentMoveIndex,
  setFen,
  setCurrentMoveIndex,
  onPuzzleSolved,
  puzzleId,
}) => {
  const isDraggablePiece = ({ piece }) => {
    return piece && piece[0] === userColor;
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (!game || currentMoveIndex >= puzzleMoves.length) return false;

    const expectedMove = puzzleMoves[currentMoveIndex];
    const expectedFrom = expectedMove.slice(0, 2);
    const expectedTo = expectedMove.slice(2, 4);
    const expectedPromotion =
      expectedMove.length === 5 ? expectedMove[4] : undefined;

    const attemptedMove = {
      from: sourceSquare,
      to: targetSquare,
      promotion: expectedPromotion,
    };

    const moveResult = game.move(attemptedMove);
    if (!moveResult) return false;

    setFen(game.fen());

    const moveMatches =
      sourceSquare === expectedFrom && targetSquare === expectedTo;

    if (moveMatches) {
      const nextMoveIndex = currentMoveIndex + 1;
      setCurrentMoveIndex(nextMoveIndex);

      if (nextMoveIndex >= puzzleMoves.length) {
        onPuzzleSolved();
        return true;
      }

      // Movimiento del rival
      const rivalMove = puzzleMoves[nextMoveIndex];
      const rivalFrom = rivalMove.slice(0, 2);
      const rivalTo = rivalMove.slice(2, 4);
      const rivalPromotion =
        rivalMove.length === 5 ? rivalMove[4] : undefined;

      setTimeout(() => {
        game.move({ from: rivalFrom, to: rivalTo, promotion: rivalPromotion });
        setFen(game.fen());
        setCurrentMoveIndex(nextMoveIndex + 1);
        if (nextMoveIndex + 1 >= puzzleMoves.length) {
          onPuzzleSolved();
        }
      }, 1000);

      return true;
    } else {
      console.log(`❌ Movimiento incorrecto. Se esperaba: ${expectedMove}`);
      setTimeout(() => {
        game.undo(); // Deshacer jugada incorrecta
        setFen(game.fen());
      }, 500);
      return true;
    }
  };

  return (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <p>Puzzle ID: {puzzleId}</p>
    <Chessboard
      position={fen}
      boardWidth={500}
      onPieceDrop={onDrop}
      isDraggablePiece={isDraggablePiece}
      boardOrientation={userColor === "w" ? "white" : "black"}

      // 🎨 Cuadros blanco y negro
      customLightSquareStyle={{ backgroundColor: "#F0F0F0" }}
      customDarkSquareStyle={{ backgroundColor: "#7B2D26" }}

      // 🖼️ Borde estético
      customBoardStyle={{
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
      }}
    />
  </div>
);


};

export default ChessBoard;
