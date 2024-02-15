import calculateWinner from "./lib/winner";
import Square from "./Square";

export default function Board({ xIsNext, squares, onPlay }) {
  /* 칸에 값 채우는 함수 */
  function handleClick(i) {
    /* 이미 채워진 칸인지 확인 && 승리 확인 */
    if (squares[i] || calculateWinner(squares)[0]) {
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

  if (winner[0]) {
    status = "Winner: " + winner[0];
  } else {
    if (!squares.includes(null)) {
      status = "No one wins: Draw!";
    } else {
      status = "Next Player: " + (xIsNext ? "X" : "O");
    }
  }

  const squareGroup = (startIdx) => {
    let three_squares = [startIdx, startIdx + 1, startIdx + 2].map((index) => {
      let isWinSquare = false;

      if (winner) {
        for (let i = 1; i < 4; i++) {
          if (index === winner[i]) {
            isWinSquare = true;
          }
        }
      }

      return (
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWin={isWinSquare}
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
