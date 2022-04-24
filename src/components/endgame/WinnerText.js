import help from '../../../helper/help.js';
import setup from '../../index.js';

const WinnerText = (parent, winner) => {
  let winnerText;
  let winnerNode = help.createElement(parent, ['winner-text']);
  let innerWinnerText = help.createElement(winnerNode, ['inner-winner-text']);
  let playAgainButton = help.createElement(winnerNode, ['btn-play-again'], 'button');
  playAgainButton.innerText = "PLAY AGAIN";
  setTimeout(() => playAgainButton.style.animation = "2.5s newGameButtonShake infinite", 600);
  playAgainButton.addEventListener('click', onNewGame);

  if (winner === setup.getPlayer().color) {
    winnerText = "YOU WON";
    innerWinnerText.style.color = "yellowgreen";
  } else {
    winnerText = "YOU LOST";
    innerWinnerText.style.color = "indianred";
  }

  innerWinnerText.innerText = winnerText.toUpperCase();
};

const onNewGame = () => {
  console.log('Starting New Game: ');
  setup.resetMain();
};

export default WinnerText;