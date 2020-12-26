import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {
  CaptainMarvelBlock,
  GandalfBlock,
  HarryPotterBlock,
  JohnSnowBlock,
  ListBlock, MegaManBlock,
  SuperMarioBlock, WonderWomanBlock, YodaBlock
} from '../../lesson-lists/lesson-lists-assignment/custom.blocks';
import {Application, Loader, Sprite, Spritesheet} from 'pixi.js';

@Component({
  selector: 'app-lesson-conditions-assignment',
  templateUrl: './lesson-conditions-assignment.component.html',
  styleUrls: ['./lesson-conditions-assignment.component.scss']
})
export class LessonConditionsAssignmentComponent implements OnInit {

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;

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
    new ListBlock('list', null, null),
    new GandalfBlock('gandalf', null, null),
    new HarryPotterBlock('harryPotter', null, null),
    new JohnSnowBlock('johnSnow', null, null),
    new SuperMarioBlock('superMario', null, null),
    new CaptainMarvelBlock('captainMarvel', null, null),
    new MegaManBlock('megaMan', null, null),
    new WonderWomanBlock('wonderWoman', null, null),
    new YodaBlock('yoda', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService) {
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

  gameLoop() {

  }

  onCode(code: string) {
    this.code = code;
  }


}
