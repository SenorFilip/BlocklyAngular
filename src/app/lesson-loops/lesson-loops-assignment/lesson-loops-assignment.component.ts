import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from '../../shared/custom.blocks';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import {Application, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';
import {Subscription} from 'rxjs';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blockly',
  templateUrl: './lesson-loops-assignment.component.html',
  styleUrls: ['./lesson-loops-assignment.component.scss']
})
export class LessonLoopsAssignmentComponent implements OnInit, OnDestroy {

  angleRight = faAngleRight;

  isButtonDisabled = false;
  isBunnyRunning = false;
  currentBlock = 0;

  lesson: Lesson;
  private lessonChangedSub: Subscription;

  // PixiJS variables
  canvas;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;
  cellHeight: number;
  cellWidth: number;
  imgBunny: Sprite;
  destinationRow = 1;
  destinationColumn = 1;
  carrotRow = 6;
  carrotColumn = 6;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  workspaceBlocks: Blockly.Block[] = [];
  currentBlockTarget: Blockly.Block;

  public config: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true,
    renderer: 'zelos'
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

    this.canvas = document.getElementsByClassName('pixiJsCanvas')[0];
    this.rendererWidth = this.canvas.offsetWidth;
    this. rendererHeight = this.canvas.offsetHeight;
    this.cellWidth = this.rendererWidth / 9;
    this.cellHeight = this.rendererHeight / 9;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/bunny/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });

    this.pixiApp.ticker.add(() => {
      this.gameLoop();
    });
    this.pixiApp.ticker.maxFPS = 40;
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['background.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;
    this.pixiApp.stage.addChild(background);

    // Adding carrot image
    const imgCarrot = new Sprite(this.sheet.textures['carrot.png']);
    imgCarrot.height = this.cellHeight;
    imgCarrot.width = this.cellWidth;
    imgCarrot.position.set(this.cellWidth * this.carrotColumn, this.cellHeight * this.carrotRow);
    this.pixiApp.stage.addChild(imgCarrot);

    // Adding bunny image
    this.imgBunny = new Sprite(this.sheet.textures['bunny.png']);
    this.imgBunny.height = this.cellHeight;
    this.imgBunny.width = this.cellWidth;
    this.imgBunny.anchor.set(0.5);
    this.imgBunny.position.set(
      this.cellWidth * this.destinationColumn + this.cellWidth / 2,
      this.cellHeight * this.destinationRow + this.cellHeight / 2);
    this.pixiApp.stage.addChild(this.imgBunny);
  }

  runRabbit() {
    this.isButtonDisabled = true;
    this.workspaceBlocks = [];
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length === 0) {
      this.isButtonDisabled = false;
      this.alertService.warn('You have FAILED! Try again.', {autoClose: true});
      return;
    }
    let currentBlock = topBlocks[0];
    while (currentBlock !== null ) {
      if (currentBlock.type === 'myCustomLoop') {
        this.unwrapLoopBlock(currentBlock);
      } else {
        this.workspaceBlocks.push(currentBlock);
      }
      currentBlock = currentBlock.getNextBlock();
    }
    this.isBunnyRunning = true;
    // sets destination block for 1. move
    this.currentBlockTarget = this.workspaceBlocks[this.currentBlock];
    this.nextBunnyDestinationCell(this.currentBlockTarget.type);
  }

  gameLoop() {
    if (this.isBunnyRunning) {
      if (this.currentBlockTarget !== undefined) {
        const designationWidth = this.cellWidth * this.destinationColumn + this.cellWidth / 2;
        const designationHeight = this.cellHeight * this.destinationRow + this.cellHeight / 2;
        // check if current X coordinate is approximately the same as designated X coordinate
        if (Math.abs(this.imgBunny.x - designationWidth) > 2) {
          if (this.imgBunny.x < designationWidth) {
            this.imgBunny.x += 2;
          } else {
            this.imgBunny.x -= 2;
          }
          // check if current Y coordinate is approximately the same as designated Y coordinate
        } else if (Math.abs(this.imgBunny.y - designationHeight) > 2) {
          if (this.imgBunny.y < designationHeight) {
            this.imgBunny.y += 2;
          } else {
            this.imgBunny.y -= 2;
          }
        } else {
          this.imgBunny.position.set(designationWidth, designationHeight);
          this.currentBlock++;
          this.currentBlockTarget = this.workspaceBlocks[this.currentBlock];
          if (this.currentBlockTarget !== undefined) {
            this.nextBunnyDestinationCell(this.currentBlockTarget.type);
          }
        }
      } else {
        this.checkIfBunnyFoundTheCarrot();
      }
    }
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
   * Changes Bunny sprite destination cell.
   */
  nextBunnyDestinationCell(direction: string) {
    switch (direction) {
      case 'moveUp': {
        this.destinationRow -= 1;
        break;
      }
      case 'moveDown': {
        this.destinationRow += 1;
        break;
      }
      case 'moveRight': {
        this.destinationColumn += 1;
        break;
      }
      case 'moveLeft': {
        this.destinationColumn -= 1;
        break;
      }
    }
    this.checkIfBunnyMovedOutOfBounds();
  }

  checkIfBunnyMovedOutOfBounds() {
    if (this.destinationRow < 0 || this.destinationRow > 8 || this.destinationColumn < 0 || this.destinationColumn > 8) {
      this.alertService.error('Bunny can\'t hop out of bounds!', {autoClose: true});
      this.reset();
    }
  }

  checkIfBunnyFoundTheCarrot() {
    // checks if bunny found the carrot
    if (this.destinationRow === this.carrotRow && this.destinationColumn === this.carrotColumn) {
      this.alertService.success('Bunny got the carrot!\n Onward to the coding part');
      // setTimeout(() => this.router.navigate(['loopsLesson']), 1800);
      this.workspace.workspace.clear();
      // sets lesson as solved
      this.lesson.isSolved = true;
      this.lessonSolvedService.updateLesson(this.lesson);
    } else {
      this.alertService.warn('You have FAILED! Try again.', {autoClose: true});
    }
    this.reset();
  }

  reset() {
    this.currentBlock = 0;
    this.isButtonDisabled = false;
    this.isBunnyRunning = false;
    this.destinationRow = 1;
    this.destinationColumn = 1;
    this.workspaceBlocks = [];
    this.imgBunny.position.set(
      this.cellWidth * this.destinationColumn + this.cellWidth / 2,
      this.cellHeight * this.destinationRow + this.cellHeight / 2);
  }

  ngOnDestroy(): void {
    // clears images from cache and loader
    Loader.shared.reset();
    utils.clearTextureCache();
  }

}
