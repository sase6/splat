import help from '../helper/help.js';
import Player from './player.js';
import botAI from '../src/bot.ai.js';

let timer = [0,15];
const initTimer = (timer[0]*60 + timer[1]);

let gameBoard = [

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    // [0, 0, 0, 0, 0, 0], 
    // [0, 0, 0, 0, 0, 0], 
    // [0, 0, 0, 0, 0, 0], 
    // [0, 0, 0, 0, 0, 0], 
    // [0, 0, 0, 0, 0, 0], 
    // [0, 0, 0, 0, 0, 0], 
    
    // [0, 0, 0],
    // [0, 0, 0],
    // [0, 0, 0],

    // [0, 0],
    // [0, 0],
];

//Init
help.drawBoard(gameBoard);

//Start
let players = [];

let timerInterval = setInterval(() => {
  const timerNode = document.querySelector('.timer-text');
  if (timer[1] === 0) {
    if (timer[0] > 0) {
      timer[0]--;
      timer[1] = 59;
    }
  } else {
    timer[1]--;
  }

  timerNode.innerText = `${help.padZero(timer[0])} : ${help.padZero(timer[1])}`;
}, 1000);

const mainGameLoop = () => {
  let gamePercentage = Math.floor(((initTimer - (timer[0]*60 + timer[1])) / initTimer)*100);
  document.querySelector('.timer').style.width = `${gamePercentage}%`;
  
  if (timer[0] === 0) {
    if (timer[1] <= 15) {
      document.querySelector('.timer-text').style.color = 'indianred';
      document.querySelector('.timer-text').style.animation = '2s growFont forwards';
    } else if (timer[1] <= 30) {
      document.querySelector('.timer-text').style.color = 'orange';
    }
  }

  if (timer[1] === 0 && timer[0] === 0) {
    players.forEach(player => player.controlGo());
    clearInterval(timerInterval);

    help.getWinner(gameBoard);
    return;
  }
  window.requestAnimationFrame(mainGameLoop);
};
mainGameLoop();

let player = new Player(gameBoard);
let bot = new Player(gameBoard, gameBoard[0].length**2);
players.push(player, bot);
botAI(bot);

export default {player};