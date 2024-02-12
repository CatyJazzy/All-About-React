import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  /* 칸에 값 채우는 함수 */
  function handleClick(i) {
    /* 이미 채워진 칸인지 확인 && 승리 확인 */
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // 순서 및 보드 상태를 제어
    onPlay(nextSquares);
  }

  /* 승자 및 순서 표시 */
  const winner = calculateWinner(squares);
  let status; // 순서 및 결과

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  const squareGroup = (startIdx) => {
    let three_squares = [startIdx, startIdx + 1, startIdx + 2].map((index) => {
      return (
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    });

    //console.log(three_squares);
    return three_squares;
  };
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">{squareGroup(0)}</div>
      <div className="board-row">{squareGroup(3)}</div>
      <div className="board-row">{squareGroup(6)}</div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); //사용자가 보고 있는 보드 순번

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; //현재 보드 상태

  /* 핸들링 함수 */
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  /* 히스토리 목록 엘리먼트 */
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          `You are at move #${move}`
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // 이기는 케이스들
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
