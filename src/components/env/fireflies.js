let getInt = (max, min = 0) => Math.floor(Math.random() * max + min);

class FireFly {
  constructor(parent = document.body, mom) {
    this.node = document.createElement('div');
    this.node.classList.add('firefly');
    parent.appendChild(this.node);
    this.init();
    this.mom = mom || null;
    this.children = [];
    if (mom) {
      mom.children.push(this);
    }
  }
  
  move() {
    this.node.style.top = `${getInt(95, 5)}%`;
    this.node.style.left = `${getInt(95, 5)}%`;
    this.node.style.animation = `${getInt(10, 5)}s glow infinite`;
    this.node.style.transition = `all ${getInt(8, 2)}s`;
    this.node.style.backgroundColor = `rgba(${getInt(255)}, ${getInt(255)}, ${getInt(255)}, 0.085)`;
    setTimeout(() => this.move(), getInt(20000, 5000));
  }
  
  init() {
    this.move();
  }
  
  make(num) {
    for (var i = 0; i < num; i++) {
      new FireFly(this.parent, this);
    }
  }
}

export default FireFly;