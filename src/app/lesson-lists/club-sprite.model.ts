import {AnimatedSprite} from 'pixi.js';

export class ClubSpriteModel {
  constructor(public code: string, public sprite: AnimatedSprite, public yCoordSubstraction: number) {
  }
}
