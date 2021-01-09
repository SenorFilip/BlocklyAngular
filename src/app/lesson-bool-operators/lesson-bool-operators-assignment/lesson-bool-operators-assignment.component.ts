import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application, Graphics, Loader, Sprite, Spritesheet, utils} from 'pixi.js';
import {Pokemon} from '../pokemon.model';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lesson-bool-operators-assignment',
  templateUrl: './lesson-bool-operators-assignment.component.html',
  styleUrls: ['./lesson-bool-operators-assignment.component.scss']
})
export class LessonBoolOperatorsAssignmentComponent implements OnInit, OnDestroy {

  progress = 0;

  // PixiJS variables
  canvas;
  pixiApp: Application;
  dropArea: Graphics;
  sheet: Spritesheet;
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
    {taskNum: 2, taskDescription: 'green OR flying', solution: this.pokemonSpritesSolutionOr},
    {taskNum: 3, taskDescription: `(electric OR green)<br> AND <br>(NOT flying)`, solution: this.pokemonSpritesSolutionAdvanced}
  ];

  // index of current task
  currentTask = this.tasks[0];

  constructor(public alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsCanvasPokemon');
    this.rendererWidth = this.canvas.offsetWidth;
    this.rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // adding spritesheet to loader if we already didn't
    if (Loader.shared.resources.spritesheet === undefined) {
      Loader.shared.add('spritesheet', 'assets/images/pixiJS/pokemon/spritesheet.json');
    }
    Loader.shared.load(() => {
      this.setup();
    });
  }

  setup() {
    // the sprite sheet we've just loaded:
    this.sheet = Loader.shared.resources.spritesheet.spritesheet;

    // initialize background sprite
    const background = new Sprite(this.sheet.textures['pokemon_heaven.png']);
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
    const zapdos = new Pokemon('Zapdos', 'yellow', ['electric', 'flying'],
      new Sprite(this.sheet.textures['zapdos.png']));
    this.pokemonSprites.push(zapdos);
    this.pokemonSpritesSolutionOr.push(zapdos);

    const charizard = new Pokemon('Charizard', 'red', ['fire', 'flying'],
      new Sprite(this.sheet.textures['charizard.png']));
    this.pokemonSprites.push(charizard);
    this.pokemonSpritesSolutionNot.push(charizard);
    this.pokemonSpritesSolutionOr.push(charizard);

    const hypno = new Pokemon('Hypno', 'yellow', ['psychic'],
      new Sprite(this.sheet.textures['hypno.png']));
    this.pokemonSprites.push(hypno);
    this.pokemonSpritesSolutionAnd.push(hypno);

    const politoed = new Pokemon('Politoed', 'green', ['water'],
      new Sprite(this.sheet.textures['politoed.png']));
    this.pokemonSprites.push(politoed);
    this.pokemonSpritesSolutionNot.push(politoed);
    this.pokemonSpritesSolutionOr.push(politoed);
    this.pokemonSpritesSolutionAdvanced.push(politoed);

    const articuno = new Pokemon('Articuno', 'blue', ['ice', 'flying'],
      new Sprite(this.sheet.textures['articuno.png']));
    this.pokemonSprites.push(articuno);
    this.pokemonSpritesSolutionNot.push(articuno);
    this.pokemonSpritesSolutionOr.push(articuno);

    const alakazam = new Pokemon('Alakazam', 'yellow', ['psychic'],
      new Sprite(this.sheet.textures['alakazam.png']));
    this.pokemonSprites.push(alakazam);
    this.pokemonSpritesSolutionAnd.push(alakazam);

    const natu = new Pokemon('Natu', 'green', ['psychic', 'flying'],
      new Sprite(this.sheet.textures['natu.png']));
    this.pokemonSprites.push(natu);
    this.pokemonSpritesSolutionNot.push(natu);
    this.pokemonSpritesSolutionOr.push(natu);

    const pikachu = new Pokemon('Pikachu', 'yellow', ['electric'],
      new Sprite(this.sheet.textures['pikachu.png']));
    this.pokemonSprites.push(pikachu);
    this.pokemonSpritesSolutionAdvanced.push(pikachu);

    const nidoqueen = new Pokemon('Nidoqueen', 'blue', ['poison', 'ground'],
      new Sprite(this.sheet.textures['nidoqueen.png']));
    this.pokemonSprites.push(nidoqueen);
    this.pokemonSpritesSolutionNot.push(nidoqueen);

    this.pokemonSprites.push(new Pokemon('Sandshrew', 'yellow', ['ground'],
      new Sprite(this.sheet.textures['sandshrew.png'])));

    const magikarp = new Pokemon('Magikarp', 'red', ['water'],
      new Sprite(this.sheet.textures['magikarp.png']));
    this.pokemonSprites.push(magikarp);
    this.pokemonSpritesSolutionNot.push(magikarp);

    const tentacool = new Pokemon('Tentacool', 'blue', ['water', 'poison'],
      new Sprite(this.sheet.textures['tentacool.png']));
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

  onDragEnd(pokemon) {
    pokemon.sprite.alpha = 1;
    delete pokemon.sprite.data;
    pokemon.sprite.dragging = false;

    const dropAreaSizes = this.dropArea.getBounds();
    if (pokemon.sprite.x > dropAreaSizes.x && pokemon.sprite.x < dropAreaSizes.x + dropAreaSizes.width &&
      pokemon.sprite.y > dropAreaSizes.y && pokemon.sprite.y < dropAreaSizes.y + dropAreaSizes.height) {
      if (this.dropAreaPokemon.indexOf(pokemon) === -1) {
        this.dropAreaPokemon.push(pokemon);
      }
    } else {
      this.dropAreaPokemon = this.dropAreaPokemon.filter(obj => obj !== pokemon);
    }
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
        this.progress += 25;
        this.alertService.success('Good job. Let\'s go the next part.');
        setTimeout(() => this.router.navigate(['/']), 1800);
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


