export default function Square({ value, onSquareClick, isWin }) {
  if (isWin) {
    return (
      <button
        className="square"
        onClick={onSquareClick}
        style={{ backgroundColor: "yellow" }}
      >
        {value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
}
