import help from '../helper/help.js';

const maxBotResponse = 30;
const minBotResponse = 10;

const randomBotMove = (bot, constraints) => {
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

const botAI = (bot) => {
  setTimeout(() => {
    bot.move(randomBotMove());
    botAI(bot);
  }, help.getRandomRange(minBotResponse, maxBotResponse));
};

export default botAI;
