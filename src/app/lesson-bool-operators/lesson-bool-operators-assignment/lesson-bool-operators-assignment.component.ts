import { Component, OnInit } from '@angular/core';
import {Application, Container, Sprite, Texture, Renderer, Graphics} from 'pixi.js';
import {Pokemon} from '../pokemon.model';

@Component({
  selector: 'app-lesson-bool-operators-assignment',
  templateUrl: './lesson-bool-operators-assignment.component.html',
  styleUrls: ['./lesson-bool-operators-assignment.component.scss']
})
export class LessonBoolOperatorsAssignmentComponent implements OnInit {

  progress = '25%';

  task1 = 'NOT yellow';
  task2 = `yellow AND `;
  task3 = 'NOT yellow';

  currentTask = this.task1;

  // PixiJS variables
  canvas;
  pixiApp: Application;
  dropArea: Graphics;

  pokemonSprites: Pokemon[] = [];
  pokemonSpritesSolutionNot: Pokemon[] = [];
  pokemonSpritesSolutionAnd: Pokemon[] = [];
  pokemonSpritesSolutionOr: Pokemon[] = [];
  pokemonSpritesSolutionAdvanced: Pokemon[] = [];
  pokemonStartingCoordinates = [
    {x: 250, y: 80}, {x: 300, y: 350}, {x: 900, y: 570}, {x: 500, y: 650}, {x: 1100, y: 625}, {x: 650, y: 600},
    {x: 1000, y: 450}, {x: 400, y: 550}, {x: 1200, y: 300}, {x: 200, y: 615}, {x: 650, y: 80}, {x: 800, y: 50}
  ];
  dropAreaPokemon: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsCanvasPokemon');
    const rendererWidth = this.canvas.offsetWidth;
    const rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      resizeTo: this.canvas,
    });

    // Adding background grid
    const backgroundContainer = new Container();
    const textureBackground = Texture.from('assets/images/pixiJS/pokemon_heaven.png');
    const imgBackground = new Sprite(textureBackground);
    imgBackground.width = rendererWidth;
    imgBackground.height = rendererHeight;
    backgroundContainer.addChild(imgBackground);
    this.pixiApp.stage.addChild(backgroundContainer);

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
    const textureZapdos = Texture.from('assets/images/pixiJS/zapdos.png');
    const zapdos = new Pokemon('Zapdos', 'yellow', ['electric', 'flying'], new Sprite(textureZapdos));
    this.pokemonSprites.push(zapdos);
    this.pokemonSpritesSolutionOr.push(zapdos);

    const textureCharizard = Texture.from('assets/images/pixiJS/charizard.png');
    const charizard = new Pokemon('Charizard', 'red', ['fire', 'flying'], new Sprite(textureCharizard));
    this.pokemonSprites.push(charizard);
    this.pokemonSpritesSolutionNot.push(charizard);
    this.pokemonSpritesSolutionOr.push(charizard);

    const textureHypno = Texture.from('assets/images/pixiJS/hypno.png');
    const hypno = new Pokemon('Hypno', 'yellow', ['psychic'], new Sprite(textureHypno));
    this.pokemonSprites.push(hypno);
    this.pokemonSpritesSolutionAnd.push(hypno);

    const texturePolitoed = Texture.from('assets/images/pixiJS/politoed.png');
    const politoed = new Pokemon('Politoed', 'green', ['water'], new Sprite(texturePolitoed));
    this.pokemonSprites.push(politoed);
    this.pokemonSpritesSolutionNot.push(politoed);
    this.pokemonSpritesSolutionOr.push(politoed);
    this.pokemonSpritesSolutionAdvanced.push(politoed);

    const textureArticuno = Texture.from('assets/images/pixiJS/articuno.png');
    const articuno = new Pokemon('Articuno', 'blue', ['ice', 'flying'], new Sprite(textureArticuno));
    this.pokemonSprites.push(articuno);
    this.pokemonSpritesSolutionNot.push(articuno);
    this.pokemonSpritesSolutionOr.push(articuno);

    const textureAlakazam = Texture.from('assets/images/pixiJS/alakazam.png');
    const alakazam = new Pokemon('Alakazam', 'yellow', ['psychic'], new Sprite(textureAlakazam));
    this.pokemonSprites.push(alakazam);
    this.pokemonSpritesSolutionAnd.push(alakazam);

    const textureNatu = Texture.from('assets/images/pixiJS/natu.png');
    const natu = new Pokemon('Natu', 'green', ['psychic', 'flying'], new Sprite(textureNatu));
    this.pokemonSprites.push(natu);
    this.pokemonSpritesSolutionNot.push(natu);
    this.pokemonSpritesSolutionOr.push(natu);

    const texturePikachu = Texture.from('assets/images/pixiJS/pikachu.png');
    const pikachu = new Pokemon('Pikachu', 'yellow', ['electric'], new Sprite(texturePikachu));
    this.pokemonSprites.push(pikachu);
    this.pokemonSpritesSolutionAdvanced.push(pikachu);

    const textureNidoqueen = Texture.from('assets/images/pixiJS/nidoqueen.png');
    const nidoqueen = new Pokemon('Nidoqueen', 'blue', ['poison', 'ground'], new Sprite(textureNidoqueen));
    this.pokemonSprites.push(nidoqueen);
    this.pokemonSpritesSolutionNot.push(nidoqueen);

    const textureSandshrew = Texture.from('assets/images/pixiJS/sandshrew.png');
    this.pokemonSprites.push(new Pokemon('Sandshrew', 'yellow', ['ground'], new Sprite(textureSandshrew)));

    const textureMagikarp = Texture.from('assets/images/pixiJS/magikarp.png');
    const magikarp = new Pokemon('Magikarp', 'red', ['water'], new Sprite(textureMagikarp));
    this.pokemonSprites.push(magikarp);
    this.pokemonSpritesSolutionNot.push(magikarp);

    const textureTentacool = Texture.from('assets/images/pixiJS/tentacool.png');
    const tentacool = new Pokemon('Tentacool', 'blue', ['water', 'poison'], new Sprite(textureTentacool));
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
    // console.log('sprite - x: ' + pokemon.sprite.x + ' y: ' + pokemon.sprite.y);
    if (pokemon.sprite.x > dropAreaSizes.x && pokemon.sprite.x < dropAreaSizes.x + dropAreaSizes.width &&
      pokemon.sprite.y > dropAreaSizes.y && pokemon.sprite.y < dropAreaSizes.y + dropAreaSizes.height) {
      this.dropAreaPokemon.push(pokemon);
      // console.log(this.dropAreaPokemon);
      // console.log(pokemon.sprite);
      // console.log(pokemon.sprite.texture.baseTexture.cacheId);
    } else {
      this.dropAreaPokemon = this.dropAreaPokemon.filter(obj => obj !== pokemon);
      // console.log(this.dropAreaPokemon);
      // console.log(pokemon.sprite);
      // console.log(pokemon.sprite.texture.baseTexture.cacheId);
    }
  }

  checkAnswer() {
    this.dropAreaPokemon.forEach((pokemon) => {
      if (this.pokemonSpritesSolutionNot.indexOf(pokemon) > -1) {
        console.log(pokemon.name + ' je tocan odgvor');
      } else {
        console.log(pokemon.name + ' KRIVO');
      }
    });
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


