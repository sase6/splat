import help from '../helper/help.js';
import Player from './player.js';
import botAI from '../src/bot.ai.js';
import Welcome from './components/Welcome.js';

//Start
let timer;
const initTimer = () => (timer[0]*60 + timer[1]);

let inSession = false;
let gameBoard;
let player;
let bot;
let players = [];

const startGame = (size) => {
  //Setup
  inSession = true;
  gameBoard = help.getGameBoard(size || 5);
  help.drawBoard(gameBoard);
  timer = [0, 6];
  player = new Player(gameBoard);
  bot = new Player(gameBoard, gameBoard[0].length**2);
  players = [player, bot];
  
  // Start/ upkeep countdown
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

  //Start game loop: 
  const mainGameLoop = () => {
    if (inSession === false) return;

    //Change game completion bar
    let gamePercentage = Math.floor(((initTimer() - (timer[0]*60 + timer[1])) / initTimer())*100);
    document.querySelector('.timer').style.width = `${gamePercentage}%`;
    
    //Change timer color
    if (timer[0] === 0) {
      if (timer[1] <= 15) {
        document.querySelector('.timer-text').style.color = 'indianred';
        document.querySelector('.timer-text').style.animation = '2s growFont forwards';
      } else if (timer[1] <= 30) {
        document.querySelector('.timer-text').style.color = 'orange';
      }
    }
  
    //Stop players on game winner
    if (timer[1] === 0 && timer[0] === 0) {
      players.forEach(player => player.controlGo());
      clearInterval(timerInterval);
  
      help.getWinner(gameBoard);
      inSession = false;
      return;
    }
    window.requestAnimationFrame(mainGameLoop);
  };

  mainGameLoop();
  setTimeout(() => (botAI(bot)), 1000);
};


//MGS:
// startGame(3);

//FOR NEW GAME:
// help.clearAll();
// startGame(3);

Welcome(() => startGame(4));

//Entity Funcs:
const getPlayer = () => player;
const getInSession = () => inSession;
//Export
export default {getPlayer, getInSession, startGame};