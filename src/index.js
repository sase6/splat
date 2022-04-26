import help from '../helper/help.js';
import Player from './player.js';
import botAI from '../src/bot.ai.js';
import Welcome from './components/Welcome.js';
import WinnerText from './components/endgame/WinnerText.js';
import Blocker from './boardAbilities/blocker.js';
import Sticky from './boardAbilities/sticky.js';
import FireFly from './components/env/fireflies.js';

//Start
let fireFly = new FireFly();
fireFly.make(19);

let timer;
const initTimer = () => (timer[0]*60 + timer[1]);

let inSession = false;
let gameBoard;
let player;
let bot;
let players = [];
let blocker;

const startGame = (size) => {
  //Setup
  let colors = ['indianred', 'skyblue', 'orange', 'thistle', 'lightseagreen'];

  const getColor = (colors) => {
    let index = Math.floor(Math.random()*colors.length);
    var color = colors[index];
    colors.splice(index, 1);
    return color;
  };

  inSession = true;
  gameBoard = help.getGameBoard(size || 5);
  help.drawBoard(gameBoard);
  timer = [0, 9];
  player = new Player(gameBoard, getColor(colors));
  bot = new Player(gameBoard, getColor(colors), gameBoard[0].length**2);
  players = [player, bot];
  blocker = new Blocker(gameBoard);
  Sticky(document.querySelector('.board-square-6'));

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
  
      WinnerText(document.querySelector('.board'), help.getWinner(blocker.block(gameBoard)));
      inSession = false;
      return;
    }
    window.requestAnimationFrame(mainGameLoop);
  };

  mainGameLoop();
  setTimeout(() => (botAI(bot)), 1000);
};

const resetMain = () => {
  help.clearAll();
  startGame(5);
}; 

Welcome(() => startGame(5));

//Entity Funcs:
const getPlayer = () => player;
const getInSession = () => inSession;
//Export
export default {getPlayer, getInSession, startGame, resetMain};