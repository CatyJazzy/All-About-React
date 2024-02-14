import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); //사용자가 보고 있는 보드 순번
  const [isAscend, setAscend] = useState(true); //히스토리 정렬기준

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

  function handleList() {
    setAscend(!isAscend);
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
        <button onClick={handleList}>
          {isAscend ? "내림차순으로" : "오름차순으로"}
        </button>
        <ol>{isAscend ? moves : [...moves].reverse()}</ol>
      </div>
    </div>
  );
}
