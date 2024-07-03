import "./App.css";
import { useState, useEffect, useCallback } from "react";
import Square from "./Components/Square";
import Header from "./Components/Header";
import Modal from "./Components/Modal";
import { Patterns } from "./Patterns";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [gameStarted, setGameStarted] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const checkWin = useCallback(() => {
    let foundWinningPattern = false;
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];

      if (firstPlayer === "") return;

      if (currPattern.every((idx) => board[idx] === firstPlayer)) {
        setResult({ winner: firstPlayer, state: "won" });
        foundWinningPattern = true;
      }
    });

    if (!foundWinningPattern && board.every((square) => square !== "")) {
      setResult({ winner: "No One", state: "Tie" });
    }
  }, [board]);

  useEffect(() => {
    checkWin();
  }, [board, checkWin]);

  useEffect(() => {
    if (result.state !== "none") {
      let modalMessage =
        result.state === "won" ? `${result.winner} has won` : `Its a Tie`;
      setModalMessage(modalMessage);
      setModalVisibility(true);
    }
  }, [result]);

  const chooseSquare = (square) => {
    if (board[square] !== "" || result.state !== "none") return;
    if (!gameStarted) {
      setGameStarted(true);
    }

    setBoard(
      board.map((val, idx) => {
        if (idx === square && val === "") {
          return player;
        }
        return val;
      })
    );

    setPlayer(player === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setResult({ winner: "none", state: "none" });
    setGameStarted(false);
    setModalVisibility(false);
    setModalMessage("");
  };

  return (
    <div className="App">
      <Modal
        title={modalMessage}
        visibility={modalVisibility}
        closeModal={restartGame}
      />

      <h1 className="title">Tic Tac Toe</h1>

      <Header gameStarted={gameStarted} currentPlayer={player} />

      <div className="board">
        <div className="row">
          <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
          <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
          <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        </div>

        <div className="row">
          <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
          <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
          <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        </div>

        <div className="row">
          <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
          <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
          <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
        </div>
      </div>
    </div>
  );
}

export default App;
