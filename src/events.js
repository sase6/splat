import setup from './index.js';

document.body.addEventListener('keyup', e => {
  let player = setup.getPlayer();
  if (setup.getInSession() === false) return;

  if (e.key === 'w') {
    player.move('up');
  } else if (e.key === 'a') {
    player.move('left');
  } else if (e.key === 's') {
    player.move('down');
  } else if (e.key === 'd') {
    player.move('right');
  }
});