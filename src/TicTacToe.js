import React, { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

const TicTacToe = (props) => {
  const {setdisableLevel2,setLevel} = props;
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [playerWins, setPlayerWins] = useState(0);
  const [computerWins, setComputerWins] = useState(0);
  const [isComputersTurn, setIsComputersTurn] = useState(false);
  const [levelPassed,setLevelPassed] = useState(false);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = (board) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every(square => square !== null)) {
      return 'draw';
    }

    return null;
  };

  const findWinningMove = (board, player) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = player;
        if (checkWinner(newBoard) === player) {
          return i;
        }
      }
    }
    return null;
  };

  const findBlockingMove = (board, player) => {
    const opponent = player === 'X' ? 'O' : 'X';
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      // Check if the opponent has two in a row
      if (board[a] === opponent && board[b] === opponent && board[c] === null) {
        return c;
      }
      if (board[a] === opponent && board[c] === opponent && board[b] === null) {
        return b;
      }
      if (board[b] === opponent && board[c] === opponent && board[a] === null) {
        return a;
      }
    }
    return null;
  };

  const computerMove = () => {
    // Check for winning move
    const winningMove = findWinningMove(board, 'O');
    if (winningMove !== null) {
        console.log("winning move: "+winningMove);
      return winningMove;
    }

    // Check for blocking move
    const blockingMove = findBlockingMove(board, 'O');
    if (blockingMove !== null) {
        console.log("blocking move: "+winningMove);
      return blockingMove;
    }

    // If no winning or blocking move, play in the center if available
    if (board[4] === null) {
      return 4;
    }

    // If none of the above, play in a random empty square
    const emptySquares = board.reduce((acc, square, index) => {
      if (!square) {
        acc.push(index);
      }
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    return emptySquares[randomIndex];
  };

  const handleClick = (index) => {
    if (!board[index] && !winner && player === 'X') {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      
      const result = checkWinner(newBoard);
      if (result === 'X') {
        setWinner('X');
        if(playerWins===2)
        {
          console.log("playerWins: " + playerWins)
          setLevelPassed(true);
          setdisableLevel2(false);
        }
        setPlayerWins(playerWins + 1);
      } else if (result === 'O') {
        setWinner('O');
        setComputerWins(computerWins + 1);
      } else if (result === 'draw') {
        setWinner('draw');
      } else {
        setIsComputersTurn(true);
      }
      
    }
  };

  useEffect(() => {
    if (isComputersTurn) {
      setTimeout(() => {
        const index = computerMove();
        const newBoard = [...board];
        newBoard[index] = 'O';
        setBoard(newBoard);

        const result = checkWinner(newBoard);
        if (result === 'O') {
          setWinner('O');
          setComputerWins(computerWins + 1);
        } else if (result === 'draw') {
          setWinner('draw');
        } else {
          setIsComputersTurn(false);
        }
      }, 600);
    }
  }, [isComputersTurn]);

  const handleNewMatch = () => {
    setBoard(initialBoard);
    setWinner(null);
    setPlayer('X');
    setIsComputersTurn(false);
    if(levelPassed)
    {
      setLevel("2");
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner === 'draw') {
      return 'Draw';
    } else if (winner) {
      
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${player}`;
    }
  };

  return (
    <>
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <span className="game-info">
        <div style={{marginTop : "10px"}}>{renderStatus()}</div>
        {levelPassed && <div style={{marginTop : "10px"}}>WOHOOO, BETU PASSED THE LEVEL !!!!"</div>}
        <div style={{marginTop : "10px"}}>Vanshika Wins: {playerWins}</div>
        <div style={{marginTop : "10px"}}>Computer Wins: {computerWins}</div>
        <button className="newmatch" onClick={handleNewMatch}>{levelPassed?"NEXT LEVEL":"NEW MATCH"}</button>
      </span>
    </div>
    
    </>
  );
};

export default TicTacToe;
