import help from '../../../helper/help.js';

class Changelog {
  constructor(parent) {
    this.parent = parent;
    this.changes  = [
      [
        "Fireflies: ",
        "To make the game more lively, I have added unique fireflies as apart of the game environment"
      ],
      [
        "Added Blocker Tiles to the Game: ",
        "Stepping on blocker tiles will not result in an increasing score count"
      ],
    ];
    this.build();
  }

  makeChangeLogNode (parent, classname, content, type = 'div') {
    var changelogNode = help.createElement(parent, [classname], type);
    changelogNode.innerText = content;
  }

  build() {
    const changelogContainer = help.createElement(this.parent, ['changelog-container']);
    this.changes.forEach(changeText => {
      var indivChange = help.createElement(changelogContainer, ['changelog-individual-change']);
      this.makeChangeLogNode(indivChange, 'changelog-header', changeText[0]);
      this.makeChangeLogNode(indivChange, 'changelog-body', changeText[1], 'p');
    });
  }

  close() {
    //
  }
};

export default Changelog;