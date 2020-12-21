import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import { MoveDownBlock, MoveRightBlock, MoveUpBlock} from '../../lesson-for-loop/lesson-for-loop/custom.blocks';
import {Application, Sprite, Loader, AnimatedSprite} from 'pixi.js';

@Component({
  selector: 'app-lesson-lists-assignment',
  templateUrl: './lesson-lists-assignment.component.html',
  styleUrls: ['./lesson-lists-assignment.component.scss']
})
export class LessonListsAssignmentComponent implements OnInit {

  // PixiJS variables
  canvas;
  pixiApp: Application;
  rendererWidth;
  rendererHeight;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  // workspaceBlocks: Blockly.Block[] = [];

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
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsListsCanvas');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    Loader.shared.add('spritesheet', 'assets/images/pixiJS/spritesheet.json')
          .load(() => {
            this.setup();
          });

  }

  onCode(code: string) {
    console.log(code);
  }

  private setup() {
    // the sprite sheet we've just loaded:
    const sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(sheet.textures['club.png']);

    background.width = this.rendererWidth;
    background.height = this.rendererHeight;

    this.pixiApp.stage.addChild(background);

    // scale stage container that it fits into the view
    // this.pixiApp.stage.scale.x = this.pixiApp.view.width / background.width;
    // this.pixiApp.stage.scale.y = this.pixiApp.view.height / background.height;

    // create an animated sprite
    const bouncer = new AnimatedSprite(sheet.animations.bouncer);

    // configure + start animation:
    bouncer.animationSpeed = 0.035;
    bouncer.width = 60;
    bouncer.height = 100;
    bouncer.position.set(this.rendererWidth / 2, this.rendererHeight - 180);
    bouncer.play();

    // Enable this to update the anchor points with each animation frame
    // animatedCapguy.updateAnchor = true;

    // add it to the stage and render!
    this.pixiApp.stage.addChild(bouncer);
    this.pixiApp.ticker.add((delta) => {
      this.gameLoop(delta, bouncer, background);
    });
  }

  gameLoop(delta, bouncer, background) {
    // animatedCapguy.x = (animatedCapguy.x + 5 * delta) % (background.width + 100);
  }

}
