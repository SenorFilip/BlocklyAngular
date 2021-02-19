import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {
  MoveDownBlock,
  MoveLeftBlock,
  MoveRightBlock,
  MoveUpBlock,
  MyMovesFunctionBlock,
  MyMovesFunctionBodyBlock
} from '../../shared/custom.blocks';
import {AnimatedSprite, Application, Loader, Sprite, Spritesheet, Texture, utils} from 'pixi.js';
import {AlertService} from '../../shared/alert';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lesson-functions-assignment',
  templateUrl: './lesson-functions-assignment.component.html',
  styleUrls: ['./lesson-functions-assignment.component.scss']
})
export class LessonFunctionsAssignmentComponent implements OnInit, OnDestroy {

  buttonsDisabled = false;
  isMouseRunning = false;
  currentMove;
  currentBlock = 0;
  currentGridPosition = {
    row: 1,
    column: 0
  };
  lastCurve = {
    row: undefined,
    column: undefined
  };
  gridArray = [
    [0, 0, 0, 0, 2, 1, 1, 2, 1, 5],
    [1, 1, 2, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [0, 0, 2, 1, 2, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [5, 1, 2, 1, 1, 1, 1, 1, 2, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 1, 1, 2, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 2, 1, 1, 1, 7],
    [0, 0, 5, 0, 0, 0, 0, 0, 0, 0]
  ];

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;
  mouseAnimatedSprite: AnimatedSprite;
  mouseSpriteDead: Sprite;
  cat1Sprite: AnimatedSprite;
  cat2Sprite: AnimatedSprite;
  trapSprite: Sprite;
  cheeseSprite: Sprite;
  paddingTopBottom: number;
  paddingLeftRight: number;
  cellHeight: number;
  cellWidth: number;
  texturesRight: Texture[] = [];
  texturesLeft: Texture[] = [];
  texturesUp: Texture[] = [];
  texturesDown: Texture[] = [];
  textureMouseWon: Texture[] = [];

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  movementDirectionBlocks: Blockly.Block[] = [];
  numberOfDirectionBlocks;

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
    new MyMovesFunctionBodyBlock('myFunctionBody', null, null),
    new MyMovesFunctionBlock('myFunction', null, null),
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveRightBlock('moveRight', null, null),
    new MoveLeftBlock('moveLeft', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService,
              private router: Router,
              public alertService: AlertService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementsByClassName('pixiJsCanvas')[0];
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;
    this.paddingTopBottom = this.rendererHeight / 14;
    this.paddingLeftRight = this.rendererWidth / 22;
    this.cellHeight = this.paddingTopBottom;
    this.cellWidth = this.paddingLeftRight * 2;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      // dodavanje spritesheet-a u Loader
      Loader.shared.add(
        'spritesheet', 'assets/images/pixiJS/mouse/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });

    this.pixiApp.ticker.add(() => {
      this.gameLoop();
    });
    this.pixiApp.ticker.maxFPS = 30;
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['background.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;

    this.pixiApp.stage.addChild(background);

    // create animated sprite for the cats
    this.cat1Sprite = new AnimatedSprite(this.sheet.animations.cat);
    this.cat1Sprite.animationSpeed = 0.055;
    this.cat1Sprite.width = 90;
    this.cat1Sprite.height = 90;
    this.cat1Sprite.anchor.set(0.5);
    this.cat1Sprite.position.set(this.paddingLeftRight + 9.5 * this.cellWidth, this.paddingTopBottom + 0.5 * this.cellHeight);
    this.cat1Sprite.play();
    this.pixiApp.stage.addChild(this.cat1Sprite);

    this.cat2Sprite = new AnimatedSprite(this.sheet.animations.cat);
    this.cat2Sprite.animationSpeed = 0.055;
    this.cat2Sprite.width = 90;
    this.cat2Sprite.height = 90;
    this.cat2Sprite.anchor.set(0.5);
    this.cat2Sprite.position.set(this.paddingLeftRight + 2.5 * this.cellWidth, this.paddingTopBottom + 11.5 * this.cellHeight);
    this.cat2Sprite.play();
    this.pixiApp.stage.addChild(this.cat2Sprite);

    // create sprite for mouse trap
    this.trapSprite = new Sprite(this.sheet.textures['mouseTrap.png']);
    this.trapSprite.height = 45;
    this.trapSprite.width = 70;
    this.trapSprite.anchor.set(0.5);
    this.trapSprite.position.set(this.paddingLeftRight + 0.5 * this.cellWidth, this.paddingTopBottom + this.cellHeight * 6.5);
    this.pixiApp.stage.addChild((this.trapSprite));

    // create sprite for cheese
    this.cheeseSprite = new Sprite(this.sheet.textures['cheese.png']);
    this.cheeseSprite.height = 50;
    this.cheeseSprite.width = 60;
    this.cheeseSprite.anchor.set(0.5);
    this.cheeseSprite.position.set(this.paddingLeftRight + 9.5 * this.cellWidth, this.paddingTopBottom + this.cellHeight * 10.5);
    this.pixiApp.stage.addChild((this.cheeseSprite));

    // sprite for the dead mouse
    this.mouseSpriteDead = new Sprite(this.sheet.textures['mouseDead.png']);
    this.mouseSpriteDead.height = 60;
    this.mouseSpriteDead.width = 60;
    this.mouseSpriteDead.anchor.set(0.5);
    this.mouseSpriteDead.visible = false;
    this.pixiApp.stage.addChild((this.mouseSpriteDead));

    // mouse animation sprite
    this.mouseAnimatedSprite = new AnimatedSprite(this.sheet.animations.mouseRight);
    this.mouseAnimatedSprite.animationSpeed = 0.055;
    this.mouseAnimatedSprite.width = 60;
    this.mouseAnimatedSprite.height = 40;
    this.mouseAnimatedSprite.anchor.set(0.5);
    this.mouseAnimatedSprite.position.set(this.paddingLeftRight + 0.5 * this.cellWidth, this.paddingTopBottom + this.cellHeight * 1.5);
    this.mouseAnimatedSprite.stop();
    this.pixiApp.stage.addChild(this.mouseAnimatedSprite);

    // defining the texture arrays to switch between them when we switch directions
    for (let i = 1; i <= 4; i++) {
      this.texturesRight.push(this.sheet.textures['mouseRight_' + i + '.png']);
      this.texturesLeft.push(this.sheet.textures['mouseLeft_' + i + '.png']);
      this.texturesUp.push(this.sheet.textures['mouseUp_' + i + '.png']);
      this.texturesDown.push(this.sheet.textures['mouseDown_' + i + '.png']);
    }
    this.textureMouseWon.push(this.sheet.textures['mouseWin_1.png']);
    this.textureMouseWon.push(this.sheet.textures['mouseWin_2.png']);
  }

  gameLoop() {
    if (this.isMouseRunning) {
      // check if mouse collided with a cat, trap or cheese
      const currentGridFieldValue = this.gridArray[this.currentGridPosition.row][this.currentGridPosition.column];
      if (currentGridFieldValue === 0 || currentGridFieldValue === undefined) {
        this.reset();
        this.alertService.error('Mouse can\'t walk out of his path.', {autoClose: true});
        return;
      } else if (this.mouseAnimatedSprite.x + this.mouseAnimatedSprite.width > this.cat1Sprite.x &&
                 Math.abs(this.mouseAnimatedSprite.y - this.cat1Sprite.y) < 10) {
        this.mouseGotEatenOrTrapped('The cat beat up the mouse.');
        return;
      } else if (this.mouseAnimatedSprite.x - this.mouseAnimatedSprite.width < this.trapSprite.x &&
        Math.abs(this.mouseAnimatedSprite.y - this.trapSprite.y) < 10) {
        this.mouseGotEatenOrTrapped('The mouse got trapped.');
        return;
      } else if (this.mouseAnimatedSprite.y + this.mouseAnimatedSprite.height > this.cat2Sprite.y &&
        Math.abs(this.mouseAnimatedSprite.x - this.cat2Sprite.x) < 10) {
        this.mouseGotEatenOrTrapped('The cat beat up the mouse.');
        return;
      } else if (this.mouseAnimatedSprite.x + this.mouseAnimatedSprite.width > this.cheeseSprite.x &&
                 Math.abs(this.mouseAnimatedSprite.y - this.cheeseSprite.y) < 10) {
        if (this.numberOfDirectionBlocks > 7) {
          this.alertService.error('You got the cheese but you used ' + this.numberOfDirectionBlocks + ' instead of 7 blocks.');
          this.reset();
          return;
        } else {
          this.isMouseRunning = false;
          this.mouseAnimatedSprite.textures = this.textureMouseWon;
          this.mouseAnimatedSprite.play();
          this.alertService.success('Mouse got the cheese!\n Let\'s get to the next part.');
          setTimeout(() => this.router.navigate(['functionsLesson']), 1800);
        }
      }

      // if current block is crossroad, check next move. If no next moves, continue the same direction
      if (currentGridFieldValue === 2 &&
        (this.lastCurve.row !== this.currentGridPosition.row ||
          this.lastCurve.column !== this.currentGridPosition.column)) {
        this.lastCurve.row = this.currentGridPosition.row;
        this.lastCurve.column = this.currentGridPosition.column;
        // don't switch to next block if it is undefined
        if (this.movementDirectionBlocks[this.currentBlock + 1] !== undefined) {
          this.currentBlock++;
        }
      }

      // else move on
      const directionBlock = this.movementDirectionBlocks[this.currentBlock];
      if (directionBlock === undefined) {
        this.reset();
        this.alertService.error('You didn\'t make it.', {autoClose: true});
        return;
      } else if (directionBlock.type === 'moveRight') {
        if (this.currentMove !== 'moveRight') {
          this.currentMove = 'moveRight';
          this.mouseAnimatedSprite.textures = this.texturesRight;
          this.mouseAnimatedSprite.play();
        }
        this.mouseAnimatedSprite.x += 2;
      } else if (directionBlock.type === 'moveLeft') {
        if (this.currentMove !== 'moveLeft') {
          this.currentMove = 'moveLeft';
          this.mouseAnimatedSprite.textures = this.texturesLeft;
          this.mouseAnimatedSprite.play();
        }
        this.mouseAnimatedSprite.x -= 2;
      } else if (directionBlock.type === 'moveUp') {
        if (this.currentMove !== 'moveUp') {
          this.currentMove = 'moveUp';
          this.mouseAnimatedSprite.textures = this.texturesUp;
          this.mouseAnimatedSprite.play();
        }
        this.mouseAnimatedSprite.y -= 2;
      } else {
        if (this.currentMove !== 'moveDown') {
          this.currentMove = 'moveDown';
          this.mouseAnimatedSprite.textures = this.texturesDown;
          this.mouseAnimatedSprite.play();
        }
        this.mouseAnimatedSprite.y += 2;
      }

      // set current grid position
      if (this.mouseAnimatedSprite.x > this.paddingLeftRight + (this.currentGridPosition.column + 1.5) * this.cellWidth) {
        this.currentGridPosition.column++;
      } else if (this.mouseAnimatedSprite.x < this.paddingLeftRight + (this.currentGridPosition.column - 0.5) * this.cellWidth) {
        this.currentGridPosition.column--;
      } else if (this.mouseAnimatedSprite.y > this.paddingTopBottom + (this.currentGridPosition.row + 1.5) * this.cellHeight) {
        this.currentGridPosition.row++;
      } else if (this.mouseAnimatedSprite.y < this.paddingTopBottom + (this.currentGridPosition.row - 0.5) * this.cellHeight) {
        this.currentGridPosition.row--;
      }
    }
  }

  runMouse() {
    this.buttonsDisabled = true;
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length === 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('You didn\'t define any blocks.', {autoClose: true});
      return;
    } else if (topBlocks.length > 2) {
      this.buttonsDisabled = false;
      this.alertService.warn('You should have 2 block lumps. The function definition and mouse directions.', {autoClose: true});
      return;
    } else if (topBlocks.length === 1) {
      this.buttonsDisabled = false;
      if (topBlocks[0].type !== 'myFunctionBody') {
        this.alertService.warn('You\'re missing the Function definition.', {autoClose: true});
      } else {
        this.alertService.warn('You\'re missing the mouse directions.', {autoClose: true});
      }
      return;
    }

    if (topBlocks[0].type === 'myFunctionBody' && topBlocks[1].type === 'myFunctionBody') {
      this.buttonsDisabled = false;
      this.alertService.warn('You\'re missing the mouse directions.', {autoClose: true});
      return;
    } else if (topBlocks[0].type !== 'myFunctionBody' && topBlocks[1].type !== 'myFunctionBody') {
      this.buttonsDisabled = false;
      this.alertService.warn('You\'re missing the Function definition.', {autoClose: true});
      return;
    }

    // collect the mouse directions
    if (topBlocks[0].type === 'myFunctionBody') {
      this.collectMouseDirectionsFromBlocks(topBlocks[0], topBlocks[1]);
    } else {
      this.collectMouseDirectionsFromBlocks(topBlocks[1], topBlocks[0]);
    }

    // if there are no moves
    if (this.movementDirectionBlocks.length === 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('There are NO moves.', {autoClose: true});
      return;
    }

    this.isMouseRunning = true;
    this.mouseAnimatedSprite.play();
  }

  collectMouseDirectionsFromBlocks(functionDef: Blockly.Block, mouseDirectionBlocks: Blockly.Block) {
    const functionBlocks = functionDef.getDescendants(true);
    functionBlocks.shift();
    if (functionBlocks.filter(block => block.type === 'myFunction').length > 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('Function definition can\'t contain MY MOVES block.', {autoClose: true});
      return;
    }

    const movementBlocks = mouseDirectionBlocks.getDescendants(true);
    this.numberOfDirectionBlocks = movementBlocks.length;
    movementBlocks.forEach((block) => {
      if (block.type === 'myFunction') {
        this.movementDirectionBlocks.push(...functionBlocks);
      } else {
        this.movementDirectionBlocks.push(block);
      }
    });
  }

  mouseGotEatenOrTrapped(message: string) {
    this.isMouseRunning = false;
    this.mouseAnimatedSprite.visible = false;
    this.mouseSpriteDead.position.set(this.mouseAnimatedSprite.x, this.mouseAnimatedSprite.y);
    this.mouseSpriteDead.visible = true;
    setTimeout(() => {
      this.reset();
    }, 3000);
    this.alertService.error(message, {autoClose: true});
  }

  reset() {
    this.isMouseRunning = false;
    this.mouseAnimatedSprite.stop();
    this.buttonsDisabled = false;
    this.currentBlock = 0;
    this.currentGridPosition = {
      row: 1,
      column: 0
    };
    this.lastCurve = {
      row: undefined,
      column: undefined
    };
    this.movementDirectionBlocks = [];
    this.numberOfDirectionBlocks = 0;
    this.mouseAnimatedSprite.textures = this.texturesRight;
    this.mouseSpriteDead.visible = false;
    this.mouseAnimatedSprite.visible = true;
    this.mouseAnimatedSprite.position.set(this.paddingLeftRight + 0.5 * this.cellWidth, this.paddingTopBottom + this.cellHeight * 1.5);
  }

  onCode(code: string) {
    this.code = code;
  }

  ngOnDestroy(): void {
    // clears images from cache and loader
    Loader.shared.reset();
    utils.clearTextureCache();
  }

}
