
//Get a color 
let colors = ['indianred', 'skyblue', 'thistle'];
let colorsCopy = colors.slice();
const getColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  let color =  colors[index];
  colors.splice(index, 1);
  console.log(colors, index, color);
  return color;
};

const resetColors = () => {
  colors = colorsCopy;
};

//Creates an HTML Element
const createElement = (parent, classlist = [], type = 'div') => {
  let element = document.createElement(type);
  classlist.forEach(_class => element.classList.add(_class));
  element.id = (classlist[0] || 'item') + ' ' + (Math.floor(Math.random()* 100000)).toString(); 
  parent.appendChild(element);
  return element;
};


//Styles the gameboard initially
const styleInitBoard = (boardNode, separator) => {
  let templateString = "";
  
  for (var i = 0; i < separator; i++) {
    templateString += "max-content ";
  }

  var timerNodeContainer = createElement(boardNode, ['timer-container']);
  var timerNodeText = createElement(timerNodeContainer, ['timer-text']);
  var timerNode = createElement(timerNodeContainer, ['timer']);

  boardNode.style.display = "grid";
  boardNode.style.gridTemplateColumns = templateString;
  boardNode.style.gridTemplateRows = templateString;
  boardNode.style.gridColumnGap = "2px";
  boardNode.style.gridRowGap = "2px";
};

//Returns a random number in range:
const getRandomRange = (min, max) => {
  return (Math.floor(Math.random() * max) + min);
};

//Draw the gameboard on screen:
const drawBoard = (boardStruct) => {
  const board = createElement(document.getElementById('root'), ['board']);
  let identifier = 0;
 
  for (var i = 0; i < boardStruct.length; i++) {
    for (var x = 0; x < boardStruct[i].length; x++) {
      identifier++;
      createElement(board, ["board-square", `board-square-${identifier}`]);
    }
  }

  const cols = Math.sqrt(identifier);
  styleInitBoard(board, cols);
};

const padZero = (num, length = 2) => {
  var numString = num.toString();
  while (numString.length < length) {
    numString = '0' + numString;
  }
  return numString;
};

const getWinner = (board) => {
  var participants = {};
  board.forEach(col => {
    col.forEach(item => {
      participants[item] = participants[item]? participants[item] + 1 : 1;
    });
  });

  var highest = {name: 'default', score: 0};
  for (var x in participants) {
    if (x === '0') continue;

    if (participants[x] > highest.score) {
      highest.name = x;
      highest.score = participants[x];
    }
  }

  // console.log('Winner: ', highest.name, '\nScore: ', highest.score);
  document.querySelector('.timer-text').innerText = (`Winner: ${highest.name}, Score: ${highest.score}`);
  return highest.name;
};

const getGameBoard = (size) => {
  var gameBoard = [];
  for (var i = 0; i < size; i++) {
    var rows = [];
    for (var j = 0; j < size; j++) {
      rows.push(0);
    }
    gameBoard.push(rows);
  }
  return gameBoard;
};

const clearAll = () => {
  console.log('Clearing Game');
  resetColors();
  document.querySelector('.board').remove();
};

export default {createElement, drawBoard, getRandomRange, padZero, getColor, getWinner, getGameBoard, clearAll};