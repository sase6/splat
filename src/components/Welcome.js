import help from '../../helper/help.js';
import setup from '../index.js';
import Changelog from './changelog/changelog.js';

const Welome = (start) => {
  //Main Welcome View
  let el = help.createElement(document.querySelector('#root'), ['welcome']);
  let changelog = new Changelog(el);

  //Side Welcome: 
  var arrowValues = ["↑", "↓", "→", "←"];
  let sideWelcomeContainer;
  let term = true;
  let getArrowValues = () => {
    if (term) {
      term = !term;
      return arrowValues.slice(0,2);
    } else {
      term = !term;
      return arrowValues.slice(2);
    }
  }

  var makeSideWelcomeContainer = () => {
    sideWelcomeContainer = help.createElement(el, ['side-welcome-container']);
    getArrowValues().forEach(key => Keys(sideWelcomeContainer, key));
  };

  makeSideWelcomeContainer();

  setInterval(() => {
    sideWelcomeContainer.style.animation = '800ms keySlideOut ease-in forwards';
    setTimeout(() => {
      if (sideWelcomeContainer) {
        sideWelcomeContainer.style.animation = '800ms keySlideIn ease-out forwards';
        sideWelcomeContainer.innerHTML = "";
        getArrowValues().forEach(key => Keys(sideWelcomeContainer, key));
        //change animation and text
      }
    }, 850);
  }, 4000);

  //Main Welcome: 
  let mainWelcomeContainer = help.createElement(el, ['main-welcome-container']);
  //Keys-Container
  let keysContainer = help.createElement(mainWelcomeContainer, ['welcome-keys-container']);
  ['W', 'A', 'S', 'D'].forEach(key => Keys(keysContainer, key, FlyingText));

  //Start
  let startContainer = help.createElement(mainWelcomeContainer, ['welcome-start-container']);
  let startButton = help.createElement(startContainer, ['btn-welcome-start'], 'button');
  ['S', 'T', 'A', 'R', 'T'].forEach(key => Keys(startButton, key));
  FlyingText(startButton, 'START', 'up');
  startButton.addEventListener('click', () => {
    console.log('Game Starting: ');
    document.querySelector('.welcome').style.animation = "500ms removeWelcome forwards";
    setTimeout(() => {
      document.querySelector('.welcome').remove();
      start();
    }, 600);
  });

  startButton.addEventListener('mouseenter', () => startButton.children[5].style.animation = '500ms textSlideUp forwards');
  startButton.addEventListener('mouseleave', () => startButton.children[5].style.animation = '500ms textSlideDown forwards');
};

//Keys Component
const Keys = (parent, val, next) => {
  let keyNode = help.createElement(parent, ['welcome-key']);
  keyNode.innerText = val;

  if (next) {
    next(keyNode, val);
    keyNode.addEventListener('mouseenter', () => {
      keyNode.children[0].style.animation = '500ms textFlyIn forwards';
    });
    keyNode.addEventListener('mouseleave', () => keyNode.children[0].style.animation = '500ms textFlyOut forwards');
  }
};

//Flying Text
const FlyingText = (parent, text, dir = 'down') => {

  const map = {
    "W": 'UP',
    "A": 'LEFT',
    "S": 'DOWN',
    "D": 'RIGHT',
  };

  let flyingText = help.createElement(parent, ['flying-text',  `flying-text-${text}`, `flying-text-${dir}`]);
  if (dir !== 'down') {
    flyingText.innerText = text;
  } else {
    flyingText.innerText = map[text];
  }
};

export default Welome;