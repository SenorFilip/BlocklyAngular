import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AnimatedSprite, Application, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {CoatBlock} from '../../shared/custom.blocks';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lesson-dictionaries-assignment',
  templateUrl: './lesson-dictionaries-assignment.component.html',
  styleUrls: ['./lesson-dictionaries-assignment.component.scss']
})
export class LessonDictionariesAssignmentComponent implements OnInit, OnDestroy {

  counterCoatPosition = {
    x: 405,
    y: 335
  };
  buttonsDisabled = false;
  isCoatBeingDelivered = false;
  isCorrectCoat = true;
  coatBeingSubmitted;
  progress = 0;

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  sheet: Spritesheet;
  coatCHeckGuy: AnimatedSprite;
  basicGuy: AnimatedSprite;
  counter: Sprite;
  coatMap = [
    {id: '10', sprite: undefined, coordinates: { x: 725, y: 325 }, color: 'blue'},
    {id: 'aA', sprite: undefined, coordinates: { x: 670, y: 325 }, color: 'grey'},
    {id: 'X2', sprite: undefined, coordinates: { x: 627, y: 325 }, color: 'red'},
    {id: '25', sprite: undefined, coordinates: { x: 575, y: 325 }, color: 'black'},
    {id: '77', sprite: undefined, coordinates: { x: 715, y: 145 }, color: 'yellow'},
    {id: ':D', sprite: undefined, coordinates: { x: 670, y: 145 }, color: 'green'},
    {id: 'TY', sprite: undefined, coordinates: { x: 627, y: 145 }, color: 'pink'},
    {id: '51', sprite: undefined, coordinates: { x: 580, y: 145 }, color: 'purple'}
  ];
  coatTasks = [
    {taskNum: 1, task: this.coatMap[4]},
    {taskNum: 2, task: this.coatMap[1]},
    {taskNum: 3, task: this.coatMap[6]}
    ];
  currentCoatTask = this.coatTasks[0];

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;

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
    new CoatBlock('coat', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService,
              private router: Router,
              public alertService: AlertService) {
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

    this.pixiApp.ticker.add(() => {
      this.gameLoop();
    });
    this.pixiApp.ticker.maxFPS = 60;
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['wallpaper.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;
    this.pixiApp.stage.addChild(background);

    // create sprite for coat guy
    this.coatCHeckGuy = new AnimatedSprite(this.sheet.animations.coatGuy);
    this.coatCHeckGuy.animationSpeed = 0.035;
    this.coatCHeckGuy.width = 80;
    this.coatCHeckGuy.height = 240;
    this.coatCHeckGuy.anchor.set(0.5);
    this.coatCHeckGuy.position.set(467, 320);
    this.coatCHeckGuy.play();
    this.pixiApp.stage.addChild(this.coatCHeckGuy);

    // create sprite for the counter
    this.counter = new Sprite(this.sheet.textures['counter.png']);
    this.counter.height = 300;
    this.counter.width = 200;
    this.counter.anchor.set(0.5);
    this.counter.position.set(420, 370);
    this.pixiApp.stage.addChild((this.counter));

    // create sprite for the other guy
    this.basicGuy = new AnimatedSprite(this.sheet.animations.guy);
    this.basicGuy.animationSpeed = 0.035;
    this.basicGuy.width = 80;
    this.basicGuy.height = 240;
    this.basicGuy.anchor.set(0.5);
    this.basicGuy.position.set(335, 320);
    this.basicGuy.play();
    this.pixiApp.stage.addChild(this.basicGuy);

    this.addCoatsToCoatCheck();
  }

  addCoatsToCoatCheck() {
    this.coatMap.forEach((coat, index) => {
      const coatSprite: Sprite = new Sprite(this.sheet.textures['coat' + (index + 1) + '.png']);
      coatSprite.height = 140;
      coatSprite.width = 115;
      coatSprite.anchor.set(0.5);
      coatSprite.position.set(coat.coordinates.x, coat.coordinates.y);
      this.pixiApp.stage.addChild((coatSprite));
      coat.sprite = coatSprite;
    });
  }

  askForCoat() {
    this.buttonsDisabled = true;
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length === 0) {
      this.buttonsDisabled = false;
      this.alertService.warn('You didn\'t define any coat tag.', {autoClose: true});
      return;
    } else if (topBlocks.length > 1) {
      this.buttonsDisabled = false;
      this.alertService.warn('You should define only 1 coat tag.', {autoClose: true});
      return;
    }
    const filteredCoats = this.coatMap.filter(coat => coat.id === topBlocks[0].getFieldValue('coatTag'));
    if (filteredCoats.length < 1) {
      this.buttonsDisabled = false;
      this.alertService.warn('There\'s no coat with the tag: ' + topBlocks[0].getFieldValue('coatTag'),
        {autoClose: true});
      return;
    }
    this.coatBeingSubmitted = filteredCoats[0];
    this.isCoatBeingDelivered = true;
  }

  gameLoop() {
    if (this.isCoatBeingDelivered) {
      // by default we assume the coat is correct
      if (this.isCorrectCoat) {
        let coatDelivered = true;
        if (this.coatBeingSubmitted.sprite.x > this.counterCoatPosition.x) {
          this.coatBeingSubmitted.sprite.x -= 2;
          coatDelivered = false;
        }
        if (this.coatBeingSubmitted.sprite.y < this.counterCoatPosition.y) {
          this.coatBeingSubmitted.sprite.y += 2;
          coatDelivered = false;
        }
        if (coatDelivered) {
          this.checkIfCoatIsCorrect();
        }
      }
      // if the coat is wrong, return it
      else {
        let coatReturned = true;
        if (this.coatBeingSubmitted.sprite.x < this.coatBeingSubmitted.coordinates.x) {
          this.coatBeingSubmitted.sprite.x += 2;
          coatReturned = false;
        }
        if (this.coatBeingSubmitted.sprite.y > this.coatBeingSubmitted.coordinates.y) {
          this.coatBeingSubmitted.sprite.y -= 2;
          coatReturned = false;
        }
        if (coatReturned) {
          this.buttonsDisabled = false;
          this.isCoatBeingDelivered = false;
          this.isCorrectCoat = true;
        }
      }
    }
  }

  checkIfCoatIsCorrect() {
    if (this.coatBeingSubmitted === this.currentCoatTask.task) {
      if (this.currentCoatTask.taskNum < 3) {
        this.progress += 33;
        const currentIndex = this.currentCoatTask.taskNum;
        this.currentCoatTask = this.coatTasks[currentIndex];
        this.alertService.success('Nice! Now get the next coat.', {autoClose: true});
        this.isCoatBeingDelivered = false;
        this.coatBeingSubmitted.sprite.position.set(this.coatBeingSubmitted.coordinates.x, this.coatBeingSubmitted.coordinates.y);
        this.buttonsDisabled = false;
    } else {
        this.progress += 34;
        this.alertService.success('Nice! Now let\'s go the next part.');
        this.workspace.workspace.clear();
        setTimeout(() => this.router.navigate(['dictionariesLesson']), 1800);
        this.isCoatBeingDelivered = false;
      }
    } else {
      this.isCorrectCoat = false;
      this.alertService.error('Nope! That\'s the wrong coat.', {autoClose: true});
    }
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
