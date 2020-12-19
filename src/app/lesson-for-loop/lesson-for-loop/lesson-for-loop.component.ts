import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from './custom.blocks';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import {Application, Container, Sprite, Texture} from 'pixi.js';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';
import {Subscription} from 'rxjs';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blockly',
  templateUrl: './lesson-for-loop.component.html',
  styleUrls: ['./lesson-for-loop.component.scss']
})
export class LessonForLoopComponent implements OnInit {

  angleRight = faAngleRight;

  disabledButtons = false;
  bunnyOutOfBounds = false;

  lesson: Lesson;
  // TODO: check if this is needed
  private lessonChangedSub: Subscription;

  // PixiJS variables
  canvas;
  pixiApp: Application;
  cellHeight: number;
  cellWidth: number;
  imgBunny: Sprite;
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

  constructor(public alertService: AlertService,
              private ngxToolboxBuilderService: NgxToolboxBuilderService,
              private router: Router,
              private lessonSolvedService: LessonSolvedService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit() {
    this.lesson = this.lessonSolvedService.getLesson('loopBunny');
    this.lessonChangedSub = this.lessonSolvedService.lessonsChanged.subscribe(
      (lessonsSolved: Lesson[]) => {
        this.lesson = lessonsSolved[this.lesson.id];
      });

    this.canvas = document.getElementById('pixiJsCanvas');
    const rendererWidth = this.canvas.offsetWidth;
    const rendererHeight = this.canvas.offsetHeight;
    this.cellWidth = rendererWidth / 9;
    this.cellHeight = rendererHeight / 9;

    this.pixiApp = new Application({
      view: this.canvas,
      backgroundColor: 0xeba42f,
      resizeTo: this.canvas,
    });

    // Adding background grid
    const backgroundContainer = new Container();
    const textureBackground = Texture.from('assets/images/pixiJS/bunny_grid.png');
    const imgBackground = new Sprite(textureBackground);
    imgBackground.width = rendererWidth;
    imgBackground.height = rendererHeight;
    backgroundContainer.addChild(imgBackground);
    this.pixiApp.stage.addChild(backgroundContainer);

    // Adding carrot image
    const textureCarrot = Texture.from('assets/images/pixiJS/carrot.png');
    const imgCarrot = new Sprite(textureCarrot);
    imgCarrot.height = this.cellHeight;
    imgCarrot.width = this.cellWidth;
    imgCarrot.position.set(this.cellWidth * this.carrotColumn, this.cellHeight * this.carrotRow);
    this.pixiApp.stage.addChild(imgCarrot);

    // Adding bunny image
    const textureBunny = Texture.from('assets/images/pixiJS/bunny.png');
    this.imgBunny = new Sprite(textureBunny);
    this.imgBunny.height = this.cellHeight;
    this.imgBunny.width = this.cellWidth;
    this.imgBunny.position.set(this.cellWidth * this.currentBunnyColumn, this.cellHeight * this.currentBunnyRow);
    this.pixiApp.stage.addChild(this.imgBunny);

    // this.pixiApp.ticker.add(this.update);
    this.pixiApp.ticker.add(this.smoothlyMoveRabbit);
    this.pixiApp.ticker.maxFPS = 40;
  }

  update() {
    console.log('It loops!');
  }

  runRabbit() {
    this.disabledButtons = true;
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

    this.makeBunnyMove();
  }

  async makeBunnyMove() {
    // makeBunnyMove() {
    console.log('\n----sadrzaj');
    for (let i = 0; i < this.workspaceBlocks.length; i++) {
      await this.moveBunny(this.workspaceBlocks[i].type);
    }
    // enables the RUN button
    this.disabledButtons = false;
    // if bunny didn't get out of bounds, check if he got the carrot
    if (!this.bunnyOutOfBounds) {
      this.checkIfBunnyFoundTheCarrot();
    }
    this.bunnyOutOfBounds = false;
    console.log('gotovo');
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
   */
  moveBunny(direction: string) {
    return new Promise((resolve) => {
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
      this.checkIfBunnyMovedOutOfBounds();
      // leaving the Bunny some room to finish its movements to the designated cell
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  smoothlyMoveRabbit = () => {
    const designationWidth = this.cellWidth * this.currentBunnyColumn;
    const designationHeight = this.cellHeight * this.currentBunnyRow;
    // check if current X coordinate is approximately the same as designated X coordinate
    if (Math.abs(this.imgBunny.x - designationWidth) > 0.04 * this.cellWidth) {
      if (this.imgBunny.x < designationWidth) {
        this.imgBunny.x += this.cellWidth / 40;
      } else {
        this.imgBunny.x -= this.cellWidth / 40;
      }
      // check if current Y coordinate is approximately the same as designated Y coordinate
    } else if (Math.abs(this.imgBunny.y - designationHeight) > 0.04 * this.cellHeight) {
      if (this.imgBunny.y < designationHeight) {
        this.imgBunny.y += this.cellHeight / 40;
      } else {
        this.imgBunny.y -= this.cellHeight / 40;
      }
    } else {
      this.imgBunny.position.set(designationWidth, designationHeight);
    }
  }

  checkIfBunnyMovedOutOfBounds() {
    if (this.currentBunnyRow < 0 || this.currentBunnyRow > 8 || this.currentBunnyColumn < 0 || this.currentBunnyColumn > 8) {
      this.alertService.error('Bunny can\'t hop out of bounds!', {autoClose: true});
      this.currentBunnyRow = 1;
      this.currentBunnyColumn = 1;
      this.imgBunny.position.set(this.cellWidth * this.currentBunnyColumn, this.cellHeight * this.currentBunnyRow);
      this.workspaceBlocks = [];
      this.bunnyOutOfBounds = true;
    }
  }

  checkIfBunnyFoundTheCarrot() {
    // checks if bunny found the carrot
    if (this.currentBunnyRow === this.carrotRow && this.currentBunnyColumn === this.carrotColumn) {
      this.alertService.success('Bunny got the carrot!\n Onward to the coding part');
      setTimeout(() => this.router.navigate(['forLoopLessonCode']), 1800);
      this.workspace.workspace.clear();
      // sets lesson as solved
      this.lesson.isSolved = true;
      this.lessonSolvedService.updateLesson(this.lesson);
    } else {
      this.alertService.warn('You have FAILED! Try again.', {autoClose: true});
    }
    this.currentBunnyRow = 1;
    this.currentBunnyColumn = 1;
    this.imgBunny.position.set(this.cellWidth * this.currentBunnyColumn, this.cellHeight * this.currentBunnyRow);
  }

}
