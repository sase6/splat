import help from '../helper/help.js';
import setup from './index.js';

const maxBotResponse = 90;
const minBotResponse = 25;

const randomBotMove = (constraints) => {
  const randomizedNum = Math.random() * 1;
  if (randomizedNum <= .25) {
    return 'up';
  } else if (randomizedNum <= .50) {
    return 'down';
  } else if (randomizedNum <= .75) {
    return 'left';
  } else {
    return 'right';
  }
};

//Main Bot Ai (Random)
const botAI = (bot) => {
  if (setup.getInSession() === false) return;

  setTimeout(() => {
    bot.move(randomBotMove());
    botAI(bot); //Comment to Stop AI
  }, help.getRandomRange(minBotResponse, maxBotResponse));
};

export default botAI;
