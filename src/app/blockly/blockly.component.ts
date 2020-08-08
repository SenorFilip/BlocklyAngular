import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService } from 'ngx-blockly';
import { ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock } from './custom.blocks';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import { Application, Texture, Sprite, Container } from 'pixi.js';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {

  // PixiJS variables
  canvas;
  pixiApp: Application;
  rendererWidth;
  rendererHeight;
  cellHeight;
  cellWidth;
  imgBunny: Sprite;
  grid: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  currentBunnyRow = 1;
  currentBunnyColumn = 1;
  carrotRow = 6;
  carrotColumn = 6;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  workspaceBlocks: Blockly.Block[] = [];

  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true
  };

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  public customBlocks: CustomBlock[] = [
    new ForLoopBlock('myCustomLoop', null, null),
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveLeftBlock('moveLeft', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new ForLoopBlock('myCustomLoop', null, null),
      new MoveUpBlock('moveUp', null, null),
      new MoveDownBlock('moveDown', null, null),
      new MoveLeftBlock('moveLeft', null, null),
      new MoveRightBlock('moveRight', null, null)
    ];
    this.config.toolbox = ngxToolboxBuilder.build();

    this.grid[0].length = 9;
  }

  ngOnInit() {
    this.canvas = document.getElementById('pixiJsCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;
    this.cellWidth = this.rendererWidth / 9;
    this.cellHeight = this.rendererHeight / 9;

    this.pixiApp = new Application({
      view: this.canvas,
      backgroundColor: 0xeba42f,
      resizeTo: this.canvas,
    });

    // Adding background grid
    const backgroundContainer = new Container();
    const textureBackground = Texture.from('assets/background.png');
    const imgBackground = new Sprite(textureBackground);
    imgBackground.width = this.rendererWidth;
    imgBackground.height = this.rendererHeight;
    backgroundContainer.addChild(imgBackground);
    this.pixiApp.stage.addChild(backgroundContainer);

    // Adding carrot image
    const textureCarrot = Texture.from('assets/carrot.png');
    const imgCarrot = new Sprite(textureCarrot);
    imgCarrot.height = this.cellHeight;
    imgCarrot.width = this.cellWidth;
    imgCarrot.position.set(this.cellWidth * this.carrotColumn, this.cellHeight * this.carrotRow);
    this.pixiApp.stage.addChild(imgCarrot);

    // Adding bunny image
    const textureBunny = Texture.from('assets/bunny.png');
    this.imgBunny = new Sprite(textureBunny);
    this.imgBunny.height = this.cellHeight;
    this.imgBunny.width = this.cellWidth;
    this.imgBunny.position.set(this.cellWidth * this.currentBunnyColumn, this.cellHeight * this.currentBunnyRow);
    this.pixiApp.stage.addChild(this.imgBunny);

  }

  runRabbit() {
    this.workspaceBlocks = [];
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    topBlocks.forEach(block => {
      let currentBlock = block;
      while (currentBlock !== null ) {
        if (currentBlock.type === 'myCustomLoop') {
          this.unwrapLoopBlock(currentBlock);
        } else {
          this.workspaceBlocks.push(currentBlock);
        }
        currentBlock = currentBlock.getNextBlock();
      }
    });

    console.log('\n----sadrzaj');
    this.workspaceBlocks.forEach(b => {
      console.log(b.type);
      this.moveBunny(b.type);
    });

  }

  onCode(code: string) {
    this.code = code;
  }

  unwrapLoopBlock(loopBlock: Blockly.Block) {
    const numberOfLoops = loopBlock.getFieldValue('numberOfLoops');
    for (let i = numberOfLoops; i > 0; i--) {
      // getChildren() return only first child because of reasons
      const loopContent = loopBlock.getChildren(true);
      if (loopContent.length !== 0) {
        let currentBlock = loopContent[0];
        while (currentBlock !== null ) {
          if (currentBlock.type === 'myCustomLoop') {
            this.unwrapLoopBlock(currentBlock);
          } else {
            this.workspaceBlocks.push(currentBlock);
          }
          currentBlock = currentBlock.getNextBlock();
        }
      }
    }
  }

  /**
   * Moves Bunny sprite in given direction.
   * @param direction
   */
  moveBunny(direction: string) {
    this.grid[this.currentBunnyRow][this.currentBunnyColumn] = 0;

    switch (direction) {
      case 'moveUp': {
        this.currentBunnyRow -= 1;
        break;
      }
      case 'moveDown': {
        this.currentBunnyRow += 1;
        break;
      }
      case 'moveRight': {
        this.currentBunnyColumn += 1;
        break;
      }
      case 'moveLeft': {
        this.currentBunnyColumn -= 1;
        break;
      }
    }

    if (this.currentBunnyRow < 0 || this.currentBunnyRow > 8 || this.currentBunnyColumn < 0 || this.currentBunnyColumn > 8) {
      alert('Bunny can\'t hop out of bounds!');
      this.currentBunnyRow = 1;
      this.currentBunnyColumn = 1;
      this.grid[1][1] = 1;
    } else {
      this.grid[this.currentBunnyRow][this.currentBunnyColumn] = 1;
    }
    this.imgBunny.position.set(this.cellWidth * this.currentBunnyColumn, this.cellHeight * this.currentBunnyRow);
  }

}
