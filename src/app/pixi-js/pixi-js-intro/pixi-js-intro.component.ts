import { Component, OnInit } from '@angular/core';
import {Application, Texture, Sprite} from 'pixi.js';

@Component({
  selector: 'app-pixi-js-intro',
  templateUrl: './pixi-js-intro.component.html',
  styleUrls: ['./pixi-js-intro.component.scss']
})
export class PixiJsIntroComponent implements OnInit {

  title = 'Intro';

  constructor() { }

  ngOnInit() {
    const canvas: any = document.getElementById('myCanvas');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const pixiApp = new Application({
      view: canvas,
      width: screenWidth,
      height: screenHeight,
      backgroundColor: 0x1099bb,
      resizeTo: window
    });

    const texture = Texture.from('assets/carrot.png');
    const img = new Sprite(texture);
    img.x = pixiApp.renderer.width / 2;
    img.y = pixiApp.renderer.height / 2;
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;
    pixiApp.stage.addChild(img);

    pixiApp.ticker.add(() => {
      img.x = pixiApp.renderer.width / 2;
      img.y = pixiApp.renderer.height / 2;
      img.rotation += 0.1;
    });
  }

}
