import {Component, OnInit, ViewChild} from '@angular/core';
import { Container, Renderer, Sprite, Texture, Ticker, Application } from 'pixi.js';

@Component({
  selector: 'app-pixi-js-filters',
  templateUrl: './pixi-js-filters.component.html',
  styleUrls: ['./pixi-js-filters.component.scss']
})
export class PixiJsFiltersComponent implements OnInit {

  title = 'Filters';
  @ViewChild('pixiContainer') pixiContainer;

  constructor() { }

  ngOnInit() {
    const canvas: any = document.getElementById('myCanvas');

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    const pixiApp = new Application({
      view: canvas,
      width: screenWidth,
      height: screenHeight,
    });

    // const myFilter = new PIXI.Filter(vShader, fShader, uniforms);

    const texture = Texture.from('assets/carrot.png');
    const img = new Sprite(texture);
    img.x = pixiApp.screen.width / 2;
    img.y = pixiApp.screen.height / 2;
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;
    // img.filters = [new PIXI.filters.BlurFilter()];
    // img.filters = [myFilter];
    pixiApp.stage.addChild(img);

    pixiApp.ticker.add(animate);


    function animate() {
      img.rotation += 0.1;
    }
  }

}
