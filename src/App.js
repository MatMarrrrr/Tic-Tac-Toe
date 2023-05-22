import "./App.css";
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import Header from "./Components/Header";
import { Patterns } from "./Patterns";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    checkWin();
    if (result.state === "none") {
      checkIfTie();
    }
  }, [board]);

  useEffect(() => {
    const delay = 100;
  
    const timer = setTimeout(() => {
      if (result.state === "none") {
        checkIfTie();
      }
  
      if (result.state !== "none") {
        alert(`Game Finished! Winning Player: ${result.winner}`);
        setGameStarted(false);
        restartGame();
      } else {
        player === "X" ? setPlayer("O") : setPlayer("X");
      }
    }, delay);
  
    return () => {
      clearTimeout(timer);
    };
  }, [result]);

  const chooseSquare = (square) => {
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

    player === "X" ? setPlayer("O") : setPlayer("X");
  };

  const checkWin = () => {
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
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
      setGameStarted(false);
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };

  return (
    <div className="App">
      <Header gameStarted={gameStarted}></Header>
      <div className="board">
        <div className="row">
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>

        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>

        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
