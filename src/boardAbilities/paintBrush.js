import help from '../../helper/help.js';

class PaintBrush {
  constructor(parent = document.body, getGameboard, rowNum, rowHeight) {
    this.parent = parent;
    this.height = rowNum * (100 / rowHeight) - (50/rowHeight) -5;
    this.boardView = [
      [1,2,3,4,5],
      [6,7,8,9,10],
      [11,12,13,14,15],
      [16,17,18,19,20],
      [21,22,23,24,25],
    ];
    this.chanceOfBrush = 80;
    this.rowNum = rowNum;
    this.getGameboard = getGameboard;

    this.build = this.build.bind(this);
    help.doIfRanTrue(this.chanceOfBrush, this.build);
  }

  build() {
    setTimeout(() => {
      this.node = help.createElement(this.parent, ['paint-brush-container']);
      if (this.height) this.node.style.top = `calc(${this.height}%)`;
      let paintBrush = help.createElement(this.node, ['paint-brush']);
      let paintBrushTopRod = help.createElement(this.node, ['paint-brush-top-rod']);
      let paintBrushTopStem = help.createElement(paintBrushTopRod, ['paint-brush-top-stem']);
      let paintBrushMainHandle = help.createElement(paintBrushTopStem, ['paint-brush-main-handle']);
      let paintBrushBottomRod = help.createElement(this.node, ['paint-brush-bottom-rod']);
      let paintBrushBottomStem = help.createElement(paintBrushBottomRod, ['paint-brush-bottom-stem']);

      let squares = this.boardView[parseInt(this.rowNum) - 1].slice();
      let ct = 0;
      let colorChangerInterval = setInterval(() => {
        if (squares.length === 0) {
          clearInterval(colorChangerInterval);
          return;
        }

        this.getGameboard()[this.rowNum-1][ct] = 'purple';

        let tileNum = squares[0];
        squares.splice(0, 1);
        document.querySelector(`.board-square-${tileNum}`).style.background = 'rgba(145, 156, 255, 0.8)';
        ct++
      }, 175);
    
      setTimeout(() => {
        this.node.remove();
      }, 5000);
    }, Math.ceil(Math.random() * 8000 + 1000));
  }
}

export default PaintBrush;