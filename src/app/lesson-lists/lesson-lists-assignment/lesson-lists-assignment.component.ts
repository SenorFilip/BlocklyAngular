import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {AnimatedSprite, Application, Container, Graphics, Loader, Sprite, Spritesheet, Text, utils} from 'pixi.js';
import {
  CaptainMarvelBlock,
  GandalfBlock,
  HarryPotterBlock,
  JohnSnowBlock,
  ListBlock,
  MegaManBlock,
  SuperMarioBlock,
  WonderWomanBlock,
  YodaBlock
} from '../../shared/custom.blocks';
import {AlertService} from '../../shared/alert';
import {ClubPersonModel} from '../club-person.model';
import {ClubSpriteModel} from '../club-sprite.model';
import {Router} from '@angular/router';
import {InputPersonModel} from '../input-person.model';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Lesson} from '../../shared/lesson/lesson.model';
import {Subscription} from 'rxjs';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-lists-assignment',
  templateUrl: './lesson-lists-assignment.component.html',
  styleUrls: ['./lesson-lists-assignment.component.scss']
})
export class LessonListsAssignmentComponent implements OnInit, OnDestroy {

  arrowRight = faAngleRight;

  lesson: Lesson;
  private lessonChangedSub: Subscription;

  currentSpriteIndex = 0;
  wrongPersonIndex = -1;
  peopleAreComing = false;

  disabledButtons = false;
  inputList: InputPersonModel[] = [];
  allSpritesList: ClubSpriteModel[] = [];
  bouncerClubSprites: ClubPersonModel[] = [
    { code: 'gandalf', name: 'Gandalf' }, { code: 'harryPotter', name: 'Harry Potter' }, { code: 'johnSnow', name: 'John Snow' },
    { code: 'superMario', name: 'Super Mario' }, { code: 'captainMarvel', name: 'Captain Marvel' }, { code: 'megaMan', name: 'Mega Man' },
    { code: 'wonderWoman', name: 'Wonder Woman' }, { code: 'yoda', name: 'Yoda' }
  ];

  // PixiJS variables
  canvas: any;
  pixiApp: Application;
  rendererWidth: number;
  rendererHeight: number;
  listText: Text;
  responseText: Text;
  sheet: Spritesheet;
  bouncer: AnimatedSprite;
  bouncerListContainer: Container = new Container();
  bouncerResponseTextContainer: Container = new Container();
  checkMarks: Graphics;

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

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService,
              public alertService: AlertService,
              private router: Router,
              private lessonSolvedService: LessonSolvedService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.lesson = this.lessonSolvedService.getLesson('listsAssignment');
    this.lessonChangedSub = this.lessonSolvedService.lessonsChanged.subscribe(
      (lessonsSolved: Lesson[]) => {
        this.lesson = lessonsSolved[this.lesson.id];
      });

    // randomize club list
    this.randomizeList();

    this.canvas = document.getElementsByClassName('pixiJsCanvas')[0];
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/club/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });

    this.pixiApp.ticker.add(() => {
      this.gameLoop();
    });
  }

  onCode(code: string) {
    this.code = code;
  }

  private setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['club.png']);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;

    this.pixiApp.stage.addChild(background);

    // adds bouncer's list
    this.listText = new Text(this.getBouncerListText(), {
      fill: 'black',
      fontSize: 18,
      lineHeight: 30
    });
    this.listText.position.set(30, 0);
    // this.pixiApp.stage.addChild(this.listText);
    this.bouncerListContainer.addChild(this.listText);

    let sprite: AnimatedSprite;
    sprite = new AnimatedSprite(this.sheet.animations.gandalf);
    sprite.animationSpeed = 0.065;
    sprite.width = 110;
    sprite.height = 160;
    sprite.position.set(-100, this.rendererHeight - 225);
    this.allSpritesList.push(new ClubSpriteModel('gandalf', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.harryPotter);
    sprite.animationSpeed = 0.065;
    sprite.width = 90;
    sprite.height = 85;
    sprite.position.set(-100, this.rendererHeight - 180);
    this.allSpritesList.push(new ClubSpriteModel('harryPotter', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.johnSnow);
    sprite.animationSpeed = 0.065;
    sprite.width = 90;
    sprite.height = 100;
    sprite.position.set(-100, this.rendererHeight - 170);
    this.allSpritesList.push(new ClubSpriteModel('johnSnow', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.superMario);
    sprite.animationSpeed = 0.065;
    sprite.width = 90;
    sprite.height = 100;
    sprite.position.set(-100, this.rendererHeight - 170);
    this.allSpritesList.push(new ClubSpriteModel('superMario', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.captainMarvel);
    sprite.animationSpeed = 0.065;
    sprite.width = 100;
    sprite.height = 130;
    sprite.position.set(-100, this.rendererHeight - 180);
    this.allSpritesList.push(new ClubSpriteModel('captainMarvel', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.megaMan);
    sprite.animationSpeed = 0.065;
    sprite.width = 90;
    sprite.height = 100;
    sprite.position.set(-100, this.rendererHeight - 170);
    this.allSpritesList.push(new ClubSpriteModel('megaMan', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.wonderWoman);
    sprite.animationSpeed = 0.065;
    sprite.width = 80;
    sprite.height = 100;
    sprite.position.set(-100, this.rendererHeight - 175);
    this.allSpritesList.push(new ClubSpriteModel('wonderWoman', sprite));

    sprite = new AnimatedSprite(this.sheet.animations.yoda);
    sprite.animationSpeed = 0.065;
    sprite.width = 45;
    sprite.height = 50;
    sprite.position.set(-100, this.rendererHeight - 120);
    this.allSpritesList.push(new ClubSpriteModel('yoda', sprite));

    // add all sprites to the stage
    this.allSpritesList.forEach((sprite1: ClubSpriteModel) => {
      this.pixiApp.stage.addChild(sprite1.sprite);
    });

    this.checkMarks = new Graphics();
    this.bouncerListContainer.addChild(this.checkMarks);

    this.bouncerListContainer.position.set(570, 105);
    this.pixiApp.stage.addChild(this.bouncerListContainer);

    // adds bouncer's response text object
    this.responseText = new Text('', {
      fill: 'black',
      fontSize: 18,
      lineHeight: 30
    });
    // set response text container to invisible until the bouncer gives his blessing
    this.bouncerResponseTextContainer.addChild(this.responseText);
    this.bouncerResponseTextContainer.position.set(570, 105);
    this.bouncerResponseTextContainer.visible = false;
    this.pixiApp.stage.addChild(this.bouncerResponseTextContainer);

    // create an animated sprite for Bouncer
    this.bouncer = new AnimatedSprite(this.sheet.animations.bouncer);
    // configure + start animation:
    this.bouncer.animationSpeed = 0.035;
    this.bouncer.width = 60;
    this.bouncer.height = 100;
    this.bouncer.position.set(this.rendererWidth / 2, this.rendererHeight - 180);
    this.bouncer.play();

    this.pixiApp.stage.addChild(this.bouncer);
  }

  sendPeople() {
    this.disabledButtons = true;
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    if (topBlocks.length !== 1) {
      this.alertService.error('Use one LIST block!', {autoClose: true});
      this.disabledButtons = false;
      return;
    } else if (topBlocks[0].type !== 'list') {
      this.alertService.error('You\'re not using the LIST block!', {autoClose: true});
      this.disabledButtons = false;
    } else {
      // getDescendants() also return original parent block as first elements. That's why we use shift() to kick him out.
      const listContent = topBlocks[0].getDescendants(true);
      listContent.shift();
      if (listContent.length === 0) {
        this.alertService.error('Your list is empty', {autoClose: true});
        this.disabledButtons = false;
        return;
      }
      listContent.forEach((block) => {
        this.inputList.push(new InputPersonModel(block.type, false));
      });

      this.peopleAreComing = true;
    }
  }

  gameLoop() {
    if (this.peopleAreComing) {
      const currentPerson = this.inputList[this.currentSpriteIndex];
      // if currentPerson is undefined - the list is too short or everyone is inside
      if (currentPerson === undefined) {
        if (this.inputList.length === 8) {
          this.showBouncerDialog('That\'s it. \nThis party is \nawesome!');
          // sets lesson as solved
          this.lesson.isSolved = true;
          this.lessonSolvedService.updateLesson(this.lesson);

          this.alertService.success('You got it. Let\'s go the next part of the lesson.');
          setTimeout(() => this.router.navigate(['listsLesson']), 3500);
          this.peopleAreComing = false;
          return;
        }

        this.showBouncerDialog('Where\'s the rest?');
        this.peopleAreComing = false;
        setTimeout(() => {
          this.reset();
        }, 2000);
        return;
      }
      const currentSprite: ClubSpriteModel = this.allSpritesList.find(i => i.code === currentPerson.name);
      currentSprite.sprite.play();
      if (this.wrongPersonIndex !== -1) {
        if (currentSprite.sprite.x < -100) {
          this.reset();
        }
        currentSprite.sprite.x = currentSprite.sprite.x - 3;
      } else if (currentSprite.sprite.x >= this.bouncer.x - this.bouncer.width - 25) {
        // stops sprite at specific frame when he arrives before the bouncer
        currentSprite.sprite.gotoAndStop(0);
        // if the list is too big - reset everything
        if (this.currentSpriteIndex > 7) {
          this.wrongPersonIndex = this.currentSpriteIndex;
          this.pixiApp.ticker.stop();
          // this.peopleAreComing = false;
          setTimeout(() => {
            this.pixiApp.ticker.start();
            this.showBouncerDialog('No way! \nThe club is full.');
          }, 1000);
        } else if (currentPerson.name === this.bouncerClubSprites[this.currentSpriteIndex].code) {
          this.pixiApp.ticker.stop();
          setTimeout(() => {
            currentSprite.sprite.x = -100;
            currentPerson.hasPassedBouncer = true;
            this.addCheckMark();
            this.pixiApp.ticker.start();
          }, 1000);
        } else {
          // 3 - wrong person
          this.addCrossMark();
          this.wrongPersonIndex = this.currentSpriteIndex;
          this.pixiApp.ticker.stop();
          setTimeout(() => {
            this.pixiApp.ticker.start();
            this.showBouncerDialog('Back of the line\nfor you!');
          }, 1000);
        }
      } else {
        currentSprite.sprite.x = currentSprite.sprite.x + 3;
      }
    }
  }

  /**
   * Adds checkmark at list item location
   */
  private addCheckMark() {
    // offset for checkmark
    const offset = 30 * this.currentSpriteIndex;
    this.checkMarks.lineStyle(4, 0x00FF00);
    this.checkMarks.moveTo(10, 7 + offset);
    this.checkMarks.lineTo(15, 15 + offset);
    this.checkMarks.lineTo(25, offset);
    // move on to the next person
    this.currentSpriteIndex++;
  }

  /**
   * Adds cross-mark at list item location
   */
  addCrossMark() {
    // offset for checkmark
    const offset = 30 * this.currentSpriteIndex;
    this.checkMarks.lineStyle(4, 0xFF0000);
    this.checkMarks.moveTo(10, offset);
    this.checkMarks.lineTo(25, 15 + offset);
    this.checkMarks.moveTo(25, offset);
    this.checkMarks.lineTo(10, 15 + offset);
  }

  randomizeList() {
    for (let i = this.bouncerClubSprites.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.bouncerClubSprites[i];
      this.bouncerClubSprites[i] = this.bouncerClubSprites[j];
      this.bouncerClubSprites[j] = temp;
    }
  }

  /**
   * Build a readable string for the bouncer text cloud
   */
  getBouncerListText() {
    let text = '';
    this.bouncerClubSprites.forEach((sprite) => {
      text = text.concat(sprite.name + '\n');
    });
    return text;
  }

  reset() {
    // reset input array
    this.inputList = [];
    this.disabledButtons = false;
    this.peopleAreComing = false;
    this.wrongPersonIndex = -1;
    this.currentSpriteIndex = 0;
    this.checkMarks.clear();
    this.showNewList();
  }

  showBouncerDialog(text: string) {
    this.bouncerResponseTextContainer.y = 200;
    this.responseText.text = text;
    this.bouncerResponseTextContainer.visible = true;
    this.bouncerListContainer.visible = false;
  }

  showNewList() {
    this.randomizeList();
    this.listText.text = this.getBouncerListText();
    this.bouncerResponseTextContainer.visible = false;
    this.bouncerListContainer.visible = true;
  }

  ngOnDestroy(): void {
    // clears images from cache and loader
    Loader.shared.reset();
    utils.clearTextureCache();
  }

}
