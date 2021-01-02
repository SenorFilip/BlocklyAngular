import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {AnimatedSprite, Application, Graphics, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {IfBlock} from './custom.blocks';
import {MoveDownBlock, MoveRightBlock} from '../../lesson-for-loop/lesson-for-loop/custom.blocks';
import {AlertService} from '../../shared/alert';
import {IfBlockLessonModel} from '../if-block-lesson.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lesson-conditions-assignment',
  templateUrl: './lesson-conditions-assignment.component.html',
  styleUrls: ['./lesson-conditions-assignment.component.scss']
})
export class LessonConditionsAssignmentComponent implements OnInit, OnDestroy {

  buttonsDisabled = false;
  marioIsRunning = false;
  roadSection = 1;
  /**
   * 0 - not moving
   * 1 - right
   * 2 - down
   */
  movingDirection = 0;
  collectedCoins = 0;

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;
  superMarioAnimatedSprite: AnimatedSprite;
  superMarioSprite: Sprite;
  coin1: AnimatedSprite;
  coin2: AnimatedSprite;
  coin3: AnimatedSprite;
  gumba1: AnimatedSprite;
  gumba2: AnimatedSprite;
  pipe1: Sprite;
  pipe2: Sprite;
  greenCircle: Graphics;
  blueCircle: Graphics;
  redCircle: Graphics;
  border1: Graphics;
  border2: Graphics;
  border3: Graphics;
  finishLine: Graphics;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  workspaceBlocks: IfBlockLessonModel[] = [];

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
    new IfBlock('if', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService,
              private router: Router,
              public alertService: AlertService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsConditionsCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/super_mario/spritesheet.json');
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

    // create sprite for Mario standing
    this.superMarioSprite = new Sprite(this.sheet.textures['superMarioStanding.png']);
    this.superMarioSprite.height = 45;
    this.superMarioSprite.width = 45;
    this.superMarioSprite.position.set(10, 60);
    this.pixiApp.stage.addChild((this.superMarioSprite));

    // create an animated sprite for Mario moving
    this.superMarioAnimatedSprite = new AnimatedSprite(this.sheet.animations.superMario);
    this.superMarioAnimatedSprite.animationSpeed = 0.065;
    this.superMarioAnimatedSprite.width = 45;
    this.superMarioAnimatedSprite.height = 45;
    this.superMarioAnimatedSprite.position.set(10, 60);
    this.superMarioAnimatedSprite.visible = false;
    this.superMarioAnimatedSprite.play();
    this.pixiApp.stage.addChild(this.superMarioAnimatedSprite);

    // create animated sprites for the coins
    this.coin1 = this.createCoinSprite(85, 140);
    this.coin2 = this.createCoinSprite(175, 220);
    this.coin3 = this.createCoinSprite(420, 415);

    // create animated sprites for the gumbas
    this.gumba1 = this.createGumbaSprite(450, 60);
    this.gumba2 = this.createGumbaSprite(87, 370);

    // Defining pipes
    this.pipe1 = new Sprite(this.sheet.textures['pipe.png']);
    this.pipe1.angle = 90;
    this.pipe1.position.set(355, 42);
    this.pipe1.height = 120;
    this.pipe1.width = 77;
    this.pixiApp.stage.addChild((this.pipe1));

    this.pipe2 = new Sprite(this.sheet.textures['pipe.png']);
    this.pipe2.position.set(283, 285);
    this.pipe2.height = 120;
    this.pipe2.width = 77;
    this.pixiApp.stage.addChild((this.pipe2));

    // Defining color circles
    this.greenCircle = new Graphics();
    // this.greenCircle.lineStyle(4, 0xFF0000);
    this.greenCircle.drawCircle(0, 0, 22);
    this.greenCircle.position.set(108, 85);
    this.pixiApp.stage.addChild(this.greenCircle);

    this.blueCircle = new Graphics();
    // this.blueCircle.lineStyle(4, 0xFF0000);
    this.blueCircle.drawCircle(0, 0, 21);
    this.blueCircle.position.set(108, 246);
    this.pixiApp.stage.addChild(this.blueCircle);

    this.redCircle = new Graphics();
    // this.redCircle.lineStyle(4, 0xFF0000);
    this.redCircle.drawCircle(0, 0, 21);
    this.redCircle.position.set(322, 250);
    this.pixiApp.stage.addChild(this.redCircle);

    this.border1 = new Graphics();
    this.border1.lineStyle(4, 0xFF0000)
      .moveTo(0, 0)
      .lineTo(60, 0);
    this.border1.position.set(300, 465);
    this.border1.visible = false;
    this.pixiApp.stage.addChild(this.border1);

    this.border2 = new Graphics();
    this.border2.lineStyle(4, 0xFF0000)
      .moveTo(0, 0)
      .lineTo(0, 60);
    this.border2.position.set(575, 220);
    this.border2.visible = false;
    this.pixiApp.stage.addChild(this.border2);

    this.border3 = new Graphics();
    this.border3.lineStyle(4, 0xFF0000)
      .moveTo(0, 0)
      .lineTo(60, 0);
    this.border3.position.set(530, 465);
    this.border3.visible = false;
    this.pixiApp.stage.addChild(this.border3);

    this.finishLine = new Graphics();
    this.finishLine.lineStyle(4, 0xFF0000)
      .moveTo(0, 0)
      .lineTo(0, 60);
    this.finishLine.position.set(720, 410);
    this.finishLine.visible = false;
    this.pixiApp.stage.addChild(this.finishLine);
  }

  runMario() {
    this.buttonsDisabled = true;
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length === 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('You have FAILED! Try again.', {autoClose: true});
      return;
    }
    let currentBlock = topBlocks[0];
    while (currentBlock !== null ) {
      if (currentBlock.type === 'if') {
        const color = currentBlock.getFieldValue('color');
        const movement = currentBlock.getFieldValue('movement');
        this.workspaceBlocks.push(new IfBlockLessonModel(currentBlock, color, movement));
      } else {
        this.workspaceBlocks.push(new IfBlockLessonModel(currentBlock, null, null));
      }
      currentBlock = currentBlock.getNextBlock();
    }

    this.marioIsRunning = true;
  }

  gameLoop() {
    if (this.marioIsRunning) {
      this.superMarioSprite.visible = false;
      this.superMarioAnimatedSprite.visible = true;

      if (this.roadSection === 1) {
        if (this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width >= this.gumba1.x) {
          this.marioFailedResetEverything('Mario has FAILED! Try again.');
        } else if ((this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width / 2) >= this.greenCircle.x &&
          this.workspaceBlocks.length > 1 && this.workspaceBlocks[1].block.type === 'if' &&
          this.workspaceBlocks[1].color === 'green' && this.workspaceBlocks[1].movement === 'moveDown') {
          // First IF intersection
          this.movingDirection = 2;
          this.roadSection = 2;
        } else if (this.workspaceBlocks[0].block.type === 'moveRight') {
          this.movingDirection = 1;
        } else if (this.workspaceBlocks[0].block.type === 'moveDown') {
          this.marioFailedResetEverything('Mario can\'t move down from here. Try again.');
        } else {
          this.marioFailedResetEverything('Mario is not standing on ' + this.workspaceBlocks[0].color +
            ' so he can\'t move ' + (this.workspaceBlocks[0].movement === 'moveDown' ? 'down' : 'right'));
        }
      } else if (this.roadSection === 2) {
        if ((this.superMarioAnimatedSprite.y + this.superMarioAnimatedSprite.height / 2) >= this.blueCircle.y &&
          this.workspaceBlocks.length > 2 && this.workspaceBlocks[2].block.type === 'if' &&
          this.workspaceBlocks[2].color === 'blue' && this.workspaceBlocks[2].movement === 'moveRight') {
          // Second IF intersection
          this.movingDirection = 1;
          this.roadSection = 3;
        } else if (this.superMarioAnimatedSprite.y + this.superMarioAnimatedSprite.height >= this.gumba2.y) {
          this.marioFailedResetEverything('Mario has FAILED! Try again.');
        } else if (this.superMarioAnimatedSprite.y + this.superMarioAnimatedSprite.height >= this.coin1.y + 20) {
          // set coin1 to invisible
          this.coin1.visible = false;
          this.collectedCoins = 1;
        }
      } else if (this.roadSection === 3) {
        if (this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width >= this.border2.x) {
          if (this.workspaceBlocks.length > 3 && this.workspaceBlocks[3].block.type === 'moveDown') {
            this.movingDirection = 2;
            this.roadSection = 4;
          } else {
            this.marioFailedResetEverything('Mario has FAILED! Try again.');
          }
        } else if ((this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width / 2) >= this.redCircle.x &&
          this.workspaceBlocks.length > 3 && this.workspaceBlocks[3].block.type === 'if' &&
          this.workspaceBlocks[3].color === 'red' && this.workspaceBlocks[3].movement === 'moveDown') {
          // Third IF intersection
          this.movingDirection = 2;
          this.roadSection = 4;
        } else if (this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width >= this.coin2.x + 20) {
          // set coin2 to invisible
          this.coin2.visible = false;
          this.collectedCoins = 2;
        }
      } else if (this.roadSection === 4) {
        if (this.superMarioAnimatedSprite.y + this.superMarioAnimatedSprite.height >= this.border1.y) {
          if (this.workspaceBlocks.length > 4 && this.workspaceBlocks[4].block.type === 'moveRight') {
            this.movingDirection = 1;
            this.roadSection = 5;
          } else {
            this.marioFailedResetEverything('Mario has FAILED! Try again.');
          }
        }
      }
      else if (this.roadSection === 5) {
        if (this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width >= this.finishLine.x) {
          if (this.collectedCoins === 3) {
            this.superMarioAnimatedSprite.visible = false;
            this.superMarioSprite.texture = this.sheet.textures['superMarioWin.png'];
            this.superMarioSprite.position.set(this.superMarioAnimatedSprite.x, this.superMarioAnimatedSprite.y);
            this.superMarioSprite.visible = true;
            this.marioIsRunning = false;
            this.alertService.success('Nice job Mario!\n Let\'s get to coding.');
            setTimeout(() => this.router.navigate(['/']), 1800);
          } else {
            this.marioFailedResetEverything('Mario is missing some coins! Try again.');
          }
        } else if (this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width >= this.coin3.x + 20 &&
          this.superMarioAnimatedSprite.x + this.superMarioAnimatedSprite.width < this.coin3.x + this.coin3.width) {
          // set coin3 to invisible
          this.coin3.visible = false;
          this.collectedCoins = 3;
        }
      }

      // if Mario is still in running mode, make him move
      if (this.movingDirection !== 0) {
        this.movingDirection === 1 ?
          this.superMarioAnimatedSprite.x = this.superMarioAnimatedSprite.x + 2 :
          this.superMarioAnimatedSprite.y = this.superMarioAnimatedSprite.y + 2;
      }
    }
  }

  createCoinSprite(x: number, y: number) {
    const coinSprite = new AnimatedSprite(this.sheet.animations.coin);
    coinSprite.animationSpeed = 0.065;
    coinSprite.width = 50;
    coinSprite.height = 50;
    coinSprite.position.set(x, y);
    coinSprite.play();
    this.pixiApp.stage.addChild(coinSprite);
    return coinSprite;
  }

  createGumbaSprite(x: number, y: number) {
    const gumbaSprite = new AnimatedSprite(this.sheet.animations.gumba);
    gumbaSprite.animationSpeed = 0.045;
    gumbaSprite.width = 40;
    gumbaSprite.height = 40;
    gumbaSprite.position.set(x, y);
    gumbaSprite.play();
    this.pixiApp.stage.addChild(gumbaSprite);
    return gumbaSprite;
  }

  marioFailedResetEverything(message: string) {
    this.superMarioAnimatedSprite.visible = false;
    this.superMarioSprite.texture = this.sheet.textures['superMarioGameOver.png'];
    this.superMarioSprite.position.set(this.superMarioAnimatedSprite.x, this.superMarioAnimatedSprite.y);
    this.superMarioSprite.visible = true;
    this.marioIsRunning = false;
    this.roadSection = 1;
    this.workspaceBlocks = [];
    this.alertService.error(message, {autoClose: true});
    setTimeout(() => {
      this.superMarioSprite.position.set(10, 60);
      this.superMarioAnimatedSprite.position.set(10, 60);
      this.superMarioSprite.texture = this.sheet.textures['superMarioStanding.png'];
      this.buttonsDisabled = false;
      this.coin1.visible = true;
      this.coin2.visible = true;
      this.coin3.visible = true;
    }, 2000);
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
