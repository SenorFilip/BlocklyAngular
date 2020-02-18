import { Component, OnInit } from '@angular/core';
import {Application, Sprite, Texture, Renderer, Container, Ticker} from 'pixi.js';

@Component({
  selector: 'app-pixi-js-renderer',
  templateUrl: './pixi-js-renderer.component.html',
  styleUrls: ['./pixi-js-renderer.component.scss']
})
export class PixiJsRendererComponent implements OnInit {

  title = 'Renderer, Ticker, & Stage';

  constructor() { }

  ngOnInit() {
    const canvas: any = document.getElementById('myCanvas');

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    const renderer = new Renderer({
      view: canvas,
      width: screenWidth,
      height: screenHeight,
      resolution: window.devicePixelRatio,
      autoDensity: true
    });

    window.addEventListener('resize', () => {
      screenWidth = window.innerWidth;
      screenHeight = window.innerHeight;
      renderer.resize(screenWidth, screenHeight);
    });

    const stage = new Container();

    const texture = Texture.from('assets/carrot.png');
    const img = new Sprite(texture);
    // img.x = renderer.width / 2;
    // img.y = renderer.height / 2;
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;
    stage.addChild(img);

    const ticker = new Ticker();
    ticker.add(() => {
      img.x = renderer.screen.width / 2;
      img.y = renderer.screen.height / 2;
      img.rotation += 0.1;
      renderer.render(stage);
    });
    ticker.start();

  }

}
