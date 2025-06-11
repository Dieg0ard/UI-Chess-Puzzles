// App.jsx
import React from "react";
import HomePage from "./pages/HomePage";
import ChessBoard from "./components/ChessBoard";
// import { Chess } from 'chess.js';

function App() {
  // const game = new Chess();
  // game.load('r5k1/p3rppp/8/q1pp2PQ/8/7P/PP4P1/4RRK1 b - - 2 20');
  // const board = game.board();
  // board.forEach(row => {
  //   console.log(row.map(piece => piece ? piece.type : '.').join(' '));
  // });


  // return <HomePage />;
    return <ChessBoard />;

}

export default App;
