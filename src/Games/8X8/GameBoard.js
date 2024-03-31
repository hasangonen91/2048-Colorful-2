export const getEmptyBoard = () => [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
  
  const hasValue = (board, value) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  };
  
  export const isFull = (board) => {
    return !hasValue(board, 0);
  };
  
  const getRandomPosition = () => {
    const rowPosition = Math.floor(Math.random() * 4);
    const colPosition = Math.floor(Math.random() * 4);
    return [rowPosition, colPosition];
  };
  
  export const generateRandom = (board) => {
    if (isFull(board)) {
      return board;
    }
  
    let [row, col] = getRandomPosition();
    while (board[row][col] !== 0) {
      [row, col] = getRandomPosition();
    }
  
    board[row][col] = 2;
    return board;
  };
  
  const takingAllToLeft = (board) => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < board.length; i++) {
      let colIndex = 0;
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== 0) {
          newBoard[i][colIndex] = board[i][j];
          colIndex++;
        }
      }
    }
    return newBoard;
  };
  
  const merge = (board) => {
    let score = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length - 1; j++) {
        if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
          board[i][j] = board[i][j] * 2;
          score += board[i][j];
          board[i][j + 1] = 0;
        }
      }
    }
  
    return [board, score];
  };
  
  export const moveLeft = (board) => {
    const newBoard1 = takingAllToLeft(board);
    const newBoard2 = merge(newBoard1);
    return [takingAllToLeft(newBoard2[0]), newBoard2[1]];
  };
  
  const reverse = (board) => {
    const reverseBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        reverseBoard[i][j] = board[i][board[i].length - 1 - j];
      }
    }
  
    return reverseBoard;
  };
  
  export const moveRight = (board) => {
    const reversedBoard = reverse(board);
    const newBoard = moveLeft(reversedBoard);
    return [reverse(newBoard[0]), newBoard[1]];
  };
  
  const rotateLeft = (board) => {
    const rotateBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[j][board[i].length - 1 - i];
      }
    }
  
    return rotateBoard;
  };
  
  const rotateRight = (board) => {
    const rotateBoard = getEmptyBoard();
  
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        rotateBoard[i][j] = board[board[i].length - 1 - j][i];
      }
    }
  
    return rotateBoard;
  };
  
  export const moveUp = (board) => {
    const rotateBoard = rotateLeft(board);
    const newBoard = moveLeft(rotateBoard);
    return [rotateRight(newBoard[0]), newBoard[1]];
  };
  
  export const moveDown = (board) => {
    const rotateBoard = rotateRight(board);
    const newBoard = moveLeft(rotateBoard);
    return [rotateLeft(newBoard[0]), newBoard[1]];
  };
  
  export const checkScore = (board) => {
    return hasValue(board, 2048);
  };
  
  const hasDiff = (board, updatedBoard) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== updatedBoard[i][j]) {
          return true;
        }
      }
    }
    return false;
  };
  
  export const isOver = (board) => {
    return !(
      hasDiff(board, moveLeft(board)[0]) ||
      hasDiff(board, moveRight(board)[0]) ||
      hasDiff(board, moveUp(board)[0]) ||
      hasDiff(board, moveDown(board)[0])
    );
  };