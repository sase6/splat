import setup from './index.js';

document.body.addEventListener('keyup', e => {
  if (e.key === 'w') {
    setup.player.move('up');
  } else if (e.key === 'a') {
    setup.player.move('left');
  } else if (e.key === 's') {
    setup.player.move('down');
  } else if (e.key === 'd') {
    setup.player.move('right');
  }
});