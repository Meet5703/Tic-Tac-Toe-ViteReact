import { useState } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner !== null) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setIsXNext(!isXNext);
    }
    setBoard(newBoard);
  };

  const renderCell = (index) => {
    return (
      <div
        className="border-2 flex items-center justify-center text-3xl"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <>
      <h1 className="text-center mt-10 text-3xl font-[500] tracking-wider uppercase">
        Tic Tac Toe
      </h1>
      {winner ? (
        <div className="text-center text-2xl font-bold">
          Game Over! Winner: {winner}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="grid h-[500px] grid-cols-3 grid-rows-3 w-[500px] border-2 border-black">
            {board.map((_, index) => renderCell(index))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
