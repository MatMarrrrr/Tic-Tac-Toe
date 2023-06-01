import React from "react";
import "../App.css";

function Square({ val, chooseSquare }) {
  return (
    <div className="square" onClick={chooseSquare}>
       {val !== "" && <img className="squareImage" src={val === "X" ? "/images/x.png" : "/images/o.png"}/>}
    </div>
  );
}

export default Square;
