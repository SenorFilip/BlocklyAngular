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
import {Application, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {AlertService} from '../../shared/alert';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';

@Component({
  selector: 'app-lesson-functions-assignment',
  templateUrl: './lesson-functions-assignment.component.html',
  styleUrls: ['./lesson-functions-assignment.component.scss']
})
export class LessonFunctionsAssignmentComponent implements OnInit, OnDestroy {

  buttonsDisabled = false;
  fieldArray = [
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
              public alertService: AlertService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsFunctionsCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/mouse/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['background.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;

    this.pixiApp.stage.addChild(background);
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

    if (topBlocks[0].type === 'myFunctionBody') {
      this.collectMouseDirectionsFromBlocks(topBlocks[0], topBlocks[1]);
    } else {
      this.collectMouseDirectionsFromBlocks(topBlocks[1], topBlocks[0]);
    }

    this.buttonsDisabled = false;
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
    console.log(movementBlocks);
    this.numberOfDirectionBlocks = movementBlocks.length;
    movementBlocks.forEach((block) => {
      if (block.type === 'myFunction') {
        this.movementDirectionBlocks.push(...functionBlocks);
      } else {
        this.movementDirectionBlocks.push(block);
      }
    });
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
