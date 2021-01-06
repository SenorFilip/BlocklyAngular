import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Application, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {CoatBlock} from '../../shared/custom.blocks';

@Component({
  selector: 'app-lesson-dictionaries-assignment',
  templateUrl: './lesson-dictionaries-assignment.component.html',
  styleUrls: ['./lesson-dictionaries-assignment.component.scss']
})
export class LessonDictionariesAssignmentComponent implements OnInit, OnDestroy {

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
    new CoatBlock('coat', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsCinemaCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/cinema/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['wallpaper.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;

    this.pixiApp.stage.addChild(background);
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
