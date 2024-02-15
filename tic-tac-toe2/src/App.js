import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [clickHis, setClickHis] = useState(Array(9).fill(null)); // 클릭한 칸 좌표 히스토리
  const [currentMove, setCurrentMove] = useState(0); //사용자가 보고 있는 보드 순번
  const [isAscend, setAscend] = useState(true); //히스토리 정렬기준

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]; //현재 보드 상태

  /* 핸들링 함수 */
  function handlePlay(nextSquares, idx) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextClick = [
      ...clickHis.slice(0, currentMove + 1),
      calculateLocation(idx),
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setClickHis(nextClick);
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
    let location;
    if (move > 0) {
      description = "Go to move #" + move;
      location = `location: (${clickHis[move][0]}, ${clickHis[move][1]})`;
    } else {
      description = "Go to game start";
      location = "";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          `You are at move #${move}`
        ) : (
          <>
            <button onClick={() => jumpTo(move)}>{description}</button>
            <div>{location}</div>
          </>
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

function calculateLocation(index) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  return [row, col];
}
