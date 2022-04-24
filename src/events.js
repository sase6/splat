import setup from './index.js';

document.body.addEventListener('keyup', e => {
  let player = setup.getPlayer();
  if (setup.getInSession() === false) return;

  if (e.key === 'w' || e.key === 'ArrowUp') {
    player.move('up');
  } else if (e.key === 'a' || e.key === 'ArrowLeft') {
    player.move('left');
  } else if (e.key === 's' || e.key === 'ArrowRight') {
    player.move('down');
  } else if (e.key === 'd' || e.key === 'ArrowDown') {
    player.move('right');
  }
});