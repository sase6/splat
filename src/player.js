
class Player {
  constructor(gameBoard, color, pos = 1,) {
    this.position = pos || 1;
    this.lengthOfCol = gameBoard[0].length;
    this.color = color;
    this.mount();
    this.ready = true;
    this.timeout = 5;
    this.gameBoard = gameBoard
  }

  select(query) {
    return document.querySelector(query);
  }

  mount() {
    this.ready = false;
    setTimeout(() => (this.ready = true), this.timeout);
    this.select(`.board-square-${this.position}`).style.border = `2px solid black`;
  }

  leaveNode(prevPosition) {
    this.select(`.board-square-${prevPosition}`).style.border = "";
    this.select(`.board-square-${prevPosition}`).style.background = this.color;
    this.setBoardVal(prevPosition);
  }

  setBoardVal(position) {
    var colSize = this.gameBoard[0].length;
    var col = 0;
    
    while (position > colSize) {
      col ++;
      position -= colSize
    };
    
    var row = position - 1;
    
    this.gameBoard[col][row] = this.color;
  }

  move(dir) {
    if (this.ready === false) return;
    let prevPosition = this.position;
    this.leaveNode(prevPosition);

    if (dir === 'up') {
      this.position -= this.lengthOfCol;      
    } else if (dir === 'down') {
      this.position += this.lengthOfCol;
    } else if (dir === 'left') {
      this.position -= 1;    
    } else if (dir === 'right') {
      this.position += 1;
    }

    if (this.position < 1 || this.position > (this.lengthOfCol**2)) {
      this.position = prevPosition;
    }

    this.mount();
  }

  controlGo(stop = true) {
    if (stop) {
      this.ready = false;
      return;
    }
    this.ready = true;
  }
};

export default Player;