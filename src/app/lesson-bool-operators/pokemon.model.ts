import {Sprite} from 'pixi.js';

export class Pokemon {
  constructor(public name: string, public color: string, public types: string[], public sprite: Sprite) {
  }
}
