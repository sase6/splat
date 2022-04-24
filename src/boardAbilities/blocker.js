import help from "../../helper/help.js";

class Blocker {
  constructor(board) {
    this.boardSize = board[0].length ** 2;
    this.blockers = [];
    this.init(board);
  }

  init(board) {
    //Sets the Css For the blocker nodes
    for (var i = 0; i < help.getRandomRange(1, 4); i++) {
      this.blockers.push(help.getRandomRange(2, this.boardSize - 2));
    }

    this.blockers.forEach(blockerNum => {
      console.log(blockerNum);
      document.querySelector(`.board-square-${blockerNum}`).classList.add('blocker-square');
    });
  }

  mapBlockerToBoard(board, num) { 
    var col = Math.ceil(num / board[0].length) - 1;

    if (num <= board[0].length) {
    col = 0;
    }

    var row = num - col*board[0].length - 1;
    board[col][row] = 0;
  };

  block(board) {
    //Applies Zeroes to Board Squares
    this.blockers.forEach(blockerNum => {
      this.mapBlockerToBoard(board, blockerNum);
    });
    
    return board;
  }
};

export default Blocker;