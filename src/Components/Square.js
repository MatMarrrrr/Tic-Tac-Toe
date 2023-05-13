import React from "react";
import "../App.css";

function Square({ val, chooseSquare }) {
  return (
    <div className="square" onclick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
