import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application, Graphics, Loader, Sprite, Spritesheet, Texture, utils} from 'pixi.js';
import {Pokemon} from '../pokemon.model';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {Lesson} from '../../shared/lesson/lesson.model';
import {Subscription} from 'rxjs';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-bool-operators-assignment',
  templateUrl: './lesson-operators-assignment.component.html',
  styleUrls: ['./lesson-operators-assignment.component.scss']
})
export class LessonOperatorsAssignmentComponent implements OnInit, OnDestroy {

  arrowRight = faAngleRight;

  lesson: Lesson;
  private lessonChangedSub: Subscription;

  progress = 0;

  // PixiJS variables
  canvas;
  pixiApp: Application;
  dropArea: Graphics;
  rendererWidth: number;
  rendererHeight: number;

  // all Pokemon
  pokemonSprites: Pokemon[] = [];
  // correct array solutions
  pokemonSpritesSolutionNot: Pokemon[] = [];
  pokemonSpritesSolutionAnd: Pokemon[] = [];
  pokemonSpritesSolutionOr: Pokemon[] = [];
  pokemonSpritesSolutionAdvanced: Pokemon[] = [];

  pokemonStartingCoordinates = [
    {x: 250, y: 80}, {x: 300, y: 350}, {x: 900, y: 570}, {x: 500, y: 650}, {x: 1100, y: 625}, {x: 650, y: 600},
    {x: 1000, y: 450}, {x: 400, y: 550}, {x: 1200, y: 300}, {x: 200, y: 615}, {x: 650, y: 80}, {x: 800, y: 50}
  ];

  // Pokemon currently in drop area
  dropAreaPokemon: Pokemon[] = [];

  tasks = [
    {taskNum: 0, taskDescription: 'NOT yellow', solution: this.pokemonSpritesSolutionNot},
    {taskNum: 1, taskDescription: 'yellow AND psychic', solution: this.pokemonSpritesSolutionAnd},
    {taskNum: 2, taskDescription: 'green OR flying (or both)', solution: this.pokemonSpritesSolutionOr},
    {taskNum: 3, taskDescription: `(electric OR green (or both))<br> AND <br>(NOT flying)`, solution: this.pokemonSpritesSolutionAdvanced}
  ];

  // index of current task
  currentTask = this.tasks[0];

  constructor(public alertService: AlertService,
              private router: Router,
              private lessonSolvedService: LessonSolvedService) { }

  ngOnInit(): void {
    this.lesson = this.lessonSolvedService.getLesson('operatorsAssignment');
    this.lessonChangedSub = this.lessonSolvedService.lessonsChanged.subscribe(
      (lessonsSolved: Lesson[]) => {
        this.lesson = lessonsSolved[this.lesson.id];
      });

    this.canvas = document.getElementById('pixiJsCanvasPokemon');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    Loader.shared.load(() => {
      this.setup();
    });
  }

  setup() {
    // initialize background sprite
    const textureBackground = Texture.from('assets/images/pixiJS/pokemon/pokemon_heaven.png');
    const background = new Sprite(textureBackground);
    background.width = this.rendererWidth;
    background.height = this.rendererHeight;
    this.pixiApp.stage.addChild(background);

    // Defining raised area borders
    this.dropArea = new Graphics();
    // this.dropArea.lineStyle(4, 0xFF0000);
    this.dropArea.drawRect(420, 115, 460, 365);
    this.pixiApp.stage.addChild(this.dropArea);

    this.definePokemonSpritesTextures();
    this.definePokemonSpritesAttributes();
    // adds the Pokemon sprites to the stage
    this.pokemonSprites.forEach((pokemon) => {
      this.pixiApp.stage.addChild(pokemon.sprite);
    });
  }

  // Fills Pokemon array
  definePokemonSpritesTextures() {
    const textureZapdos = Texture.from('assets/images/pixiJS/pokemon/zapdos.png');
    const zapdos = new Pokemon('Zapdos', 'yellow', ['electric', 'flying'],
      new Sprite(textureZapdos));
    this.pokemonSprites.push(zapdos);
    this.pokemonSpritesSolutionOr.push(zapdos);

    const textureCharizard = Texture.from('assets/images/pixiJS/pokemon/charizard.png');
    const charizard = new Pokemon('Charizard', 'red', ['fire', 'flying'],
      new Sprite(textureCharizard));
    this.pokemonSprites.push(charizard);
    this.pokemonSpritesSolutionNot.push(charizard);
    this.pokemonSpritesSolutionOr.push(charizard);

    const textureHypno = Texture.from('assets/images/pixiJS/pokemon/hypno.png');
    const hypno = new Pokemon('Hypno', 'yellow', ['psychic'],
      new Sprite(textureHypno));
    this.pokemonSprites.push(hypno);
    this.pokemonSpritesSolutionAnd.push(hypno);

    const texturePolitoed = Texture.from('assets/images/pixiJS/pokemon/politoed.png');
    const politoed = new Pokemon('Politoed', 'green', ['water'],
      new Sprite(texturePolitoed));
    this.pokemonSprites.push(politoed);
    this.pokemonSpritesSolutionNot.push(politoed);
    this.pokemonSpritesSolutionOr.push(politoed);
    this.pokemonSpritesSolutionAdvanced.push(politoed);

    const textureArticuno = Texture.from('assets/images/pixiJS/pokemon/articuno.png');
    const articuno = new Pokemon('Articuno', 'blue', ['ice', 'flying'],
      new Sprite(textureArticuno));
    this.pokemonSprites.push(articuno);
    this.pokemonSpritesSolutionNot.push(articuno);
    this.pokemonSpritesSolutionOr.push(articuno);

    const textureAlakazam = Texture.from('assets/images/pixiJS/pokemon/alakazam.png');
    const alakazam = new Pokemon('Alakazam', 'yellow', ['psychic'],
      new Sprite(textureAlakazam));
    this.pokemonSprites.push(alakazam);
    this.pokemonSpritesSolutionAnd.push(alakazam);

    const textureNatu = Texture.from('assets/images/pixiJS/pokemon/natu.png');
    const natu = new Pokemon('Natu', 'green', ['psychic', 'flying'],
      new Sprite(textureNatu));
    this.pokemonSprites.push(natu);
    this.pokemonSpritesSolutionNot.push(natu);
    this.pokemonSpritesSolutionOr.push(natu);

    const texturePikachu = Texture.from('assets/images/pixiJS/pokemon/pikachu.png');
    const pikachu = new Pokemon('Pikachu', 'yellow', ['electric'],
      new Sprite(texturePikachu));
    this.pokemonSprites.push(pikachu);
    this.pokemonSpritesSolutionAdvanced.push(pikachu);

    const textureNidoqueen = Texture.from('assets/images/pixiJS/pokemon/nidoqueen.png');
    const nidoqueen = new Pokemon('Nidoqueen', 'blue', ['poison', 'ground'],
      new Sprite(textureNidoqueen));
    this.pokemonSprites.push(nidoqueen);
    this.pokemonSpritesSolutionNot.push(nidoqueen);

    const textureSandshrew = Texture.from('assets/images/pixiJS/pokemon/sandshrew.png');
    this.pokemonSprites.push(new Pokemon('Sandshrew', 'yellow', ['ground'],
      new Sprite(textureSandshrew)));

    const textureMagikarp = Texture.from('assets/images/pixiJS/pokemon/magikarp.png');
    const magikarp = new Pokemon('Magikarp', 'red', ['water'],
      new Sprite(textureMagikarp));
    this.pokemonSprites.push(magikarp);
    this.pokemonSpritesSolutionNot.push(magikarp);

    const textureTentacool = Texture.from('assets/images/pixiJS/pokemon/tentacool.png');
    const tentacool = new Pokemon('Tentacool', 'blue', ['water', 'poison'],
      new Sprite(textureTentacool));
    this.pokemonSprites.push(tentacool);
    this.pokemonSpritesSolutionNot.push(tentacool);
  }

  // defines pokemon attributes
  definePokemonSpritesAttributes() {
    this.pokemonSprites.forEach((pokemon, index) => {
      pokemon.sprite.height = 90;
      pokemon.sprite.width = 90;
      pokemon.sprite.position.set(this.pokemonStartingCoordinates[index].x, this.pokemonStartingCoordinates[index].y);
      pokemon.sprite.interactive = true;
      pokemon.sprite.buttonMode = true;
      pokemon.sprite.anchor.set(0.5);
      pokemon.sprite
        .on('pointerdown', onDragStart)
        .on('pointerup', () => {
          this.onDragEnd(pokemon);
        })
        .on('pointerupoutside', () => {
          this.onDragEnd(pokemon);
        })
        .on('pointermove', onDragMove);
    });
  }

  submitAnswer() {
    if (this.checkAnswer()) {
      if (this.currentTask.taskNum < 3) {
        this.alertService.success('Nice! Now solve the next one.', {autoClose: true});
        // switch to the next task
        const currentIndex = this.currentTask.taskNum;
        this.currentTask = this.tasks[currentIndex + 1];
        this.resetPokemonPositions();
        this.progress += 25;
      } else {
        // sets lesson as solved
        this.lesson.isSolved = true;
        this.lessonSolvedService.updateLesson(this.lesson);

        this.progress += 25;
        this.alertService.success('Good job. Let\'s go the next part.');
        setTimeout(() => this.router.navigate(['/operatorsLesson']), 1800);
      }
      // empty drop area array
      this.dropAreaPokemon = [];
    } else {
      this.alertService.error('Nope. Wrong.', {autoClose: true});
    }
  }

  // check if the submitted answer is correct
  checkAnswer() {
    if (this.dropAreaPokemon.length !== this.currentTask.solution.length) {
      return false;
    } else {
      this.dropAreaPokemon.forEach((pokemon) => {
        if (this.currentTask.solution.indexOf(pokemon) < 0) {
          return false;
        }
      });
      return true;
    }
  }

  // reset pokemon positions
  private resetPokemonPositions() {
    this.pokemonSprites.forEach((pokemon, index) => {
      const originalPosition = this.pokemonStartingCoordinates[index];
      pokemon.sprite.x = originalPosition.x;
      pokemon.sprite.y = originalPosition.y;
    });
  }

  onDragEnd(pokemon) {
    pokemon.sprite.alpha = 1;
    delete pokemon.sprite.data;
    pokemon.sprite.dragging = false;

    const dropAreaSizes = this.dropArea.getBounds();
    if (pokemon.sprite.x > dropAreaSizes.x &&
      pokemon.sprite.x < dropAreaSizes.x + dropAreaSizes.width &&
      pokemon.sprite.y > dropAreaSizes.y &&
      pokemon.sprite.y < dropAreaSizes.y + dropAreaSizes.height) {
      if (this.dropAreaPokemon.indexOf(pokemon) === -1) {
        this.dropAreaPokemon.push(pokemon);
      }
    } else {
      this.dropAreaPokemon = this.dropAreaPokemon.filter(obj => obj !== pokemon);
    }
  }

  ngOnDestroy(): void {
    // clears images from cache and loader
    Loader.shared.reset();
    utils.clearTextureCache();
  }

}

function onDragStart(event) {
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragMove() {
  if (this.dragging === true) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }
}


