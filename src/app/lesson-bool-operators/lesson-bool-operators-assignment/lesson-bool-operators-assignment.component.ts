import { Component, OnInit } from '@angular/core';
import {Application, Container, Sprite, Texture, Renderer, Graphics} from 'pixi.js';
import {Pokemon} from '../pokemon.model';

@Component({
  selector: 'app-lesson-bool-operators-assignment',
  templateUrl: './lesson-bool-operators-assignment.component.html',
  styleUrls: ['./lesson-bool-operators-assignment.component.scss']
})
export class LessonBoolOperatorsAssignmentComponent implements OnInit {

  // PixiJS variables
  canvas;
  pixiApp: Application;
  dropArea: Graphics;

  pokemonSprites: Pokemon[] = [];
  pokemonStartingCoordinates = [
    {x: 250, y: 80}, {x: 300, y: 350}, {x: 900, y: 550}, {x: 500, y: 650}, {x: 1050, y: 625}, {x: 650, y: 600},
    {x: 750, y: 625}, {x: 400, y: 600}, {x: 1100, y: 300}, {x: 200, y: 600}, {x: 650, y: 80}, {x: 800, y: 50}
  ];
  dropAreaPokemon: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsCanvas');
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
    this.dropArea.drawRect(400, 115, 430, 365);
    this.pixiApp.stage.addChild(this.dropArea);

    this.definePokemonSprites();
    this.definePokemonSpritesAttributes();
    // adds the Pokemon sprites to the stage
    this.pokemonSprites.forEach((pokemon) => {
      this.pixiApp.stage.addChild(pokemon.sprite);
    });
  }

  // Fills Pokemon array
  definePokemonSprites() {
    const textureZapdos = Texture.from('assets/images/pixiJS/zapdos.png');
    const spriteZapdos = new Sprite(textureZapdos);
    this.pokemonSprites.push(new Pokemon('Zapdos', 'yellow', ['electric'], spriteZapdos));

    const textureCharizard = Texture.from('assets/images/pixiJS/charizard.png');
    const spriteCharizard = new Sprite(textureCharizard);
    this.pokemonSprites.push(new Pokemon('Charizard', 'red', ['fire', 'flying'], spriteCharizard));

    const textureHypno = Texture.from('assets/images/pixiJS/hypno.png');
    const spriteHypno = new Sprite(textureHypno);
    this.pokemonSprites.push(new Pokemon('Hypno', 'yellow', ['psychic'], spriteHypno));

    const texturePolitoed = Texture.from('assets/images/pixiJS/politoed.png');
    const spritePolitoed = new Sprite(texturePolitoed);
    this.pokemonSprites.push(new Pokemon('Politoed', 'green', ['water'], spritePolitoed));

    const textureArticuno = Texture.from('assets/images/pixiJS/articuno.png');
    const spriteArticuno = new Sprite(textureArticuno);
    this.pokemonSprites.push(new Pokemon('Articuno', 'blue', ['ice', 'flying'], spriteArticuno));

    const textureAlakazam = Texture.from('assets/images/pixiJS/alakazam.png');
    const spriteAlakazam = new Sprite(textureAlakazam);
    this.pokemonSprites.push(new Pokemon('Alakazam', 'yellow', ['psychic'], spriteAlakazam));

    const textureNatu = Texture.from('assets/images/pixiJS/natu.png');
    const spriteNatu = new Sprite(textureNatu);
    this.pokemonSprites.push(new Pokemon('Natu', 'green', ['psychic', 'flying'], spriteNatu));

    const texturePikachu = Texture.from('assets/images/pixiJS/pikachu.png');
    const spritePikachu = new Sprite(texturePikachu);
    this.pokemonSprites.push(new Pokemon('Pikachu', 'yellow', ['electric'], spritePikachu));

    const textureNidoqueen = Texture.from('assets/images/pixiJS/nidoqueen.png');
    const spriteNidoqueen = new Sprite(textureNidoqueen);
    this.pokemonSprites.push(new Pokemon('Nidoqueen', 'blue', ['poison', 'ground'], spriteNidoqueen));

    const textureSandshrew = Texture.from('assets/images/pixiJS/sandshrew.png');
    const spriteSandshrew = new Sprite(textureSandshrew);
    this.pokemonSprites.push(new Pokemon('Sandshrew', 'yellow', ['ground'], spriteSandshrew));

    const textureMagikarp = Texture.from('assets/images/pixiJS/magikarp.png');
    const spriteMagikarp = new Sprite(textureMagikarp);
    this.pokemonSprites.push(new Pokemon('Magikarp', 'red', ['water'], spriteMagikarp));

    const textureTentacool = Texture.from('assets/images/pixiJS/tentacool.png');
    const spriteTentacool = new Sprite(textureTentacool);
    this.pokemonSprites.push(new Pokemon('Tentacool', 'blue', ['water', 'poison'], spriteTentacool));
  }

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
    } else {
      this.dropAreaPokemon = this.dropAreaPokemon.filter(obj => obj !== pokemon);
      // console.log(this.dropAreaPokemon);
    }
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


