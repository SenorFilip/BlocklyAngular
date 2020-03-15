import { Component, OnInit } from '@angular/core';
import {Application, Sprite, Texture, Graphics, Circle, Point} from 'pixi.js';

@Component({
  selector: 'app-pixi-js-graphics',
  templateUrl: './pixi-js-graphics.component.html',
  styleUrls: ['./pixi-js-graphics.component.scss']
})
export class PixiJsGraphicsComponent implements OnInit {

  title = 'Graphics API';

  constructor() { }

  ngOnInit() {
    const canvas: any = document.getElementById('myCanvas');

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const pixiApp = new Application({
      view: canvas,
      width: screenWidth,
      height: screenHeight
    });

    let graphics = new Graphics();
    graphics.x = pixiApp.renderer.width / 2;
    graphics.y = pixiApp.renderer.height / 2;
    pixiApp.stage.addChild(graphics);

    // graphics.lineStyle(5, 0x00ff00);
    graphics.beginFill(0xff0000);
    // pozicioniranje pocetne tocke crtanja
    // graphics.moveTo(0, 0);

    // graphics.lineTo(100, 100);
    // graphics.lineTo(100, 200);
    // graphics.lineTo(0, 200);
    // graphics.bezierCurveTo(-200, 200, -200, 100, -100, 0);
    // graphics.quadraticCurveTo(-200, -100, 0, -200);

    let radius = 50;
    graphics.arc(0, 0, radius, 0, Math.PI * 2);

    // crtanje linija
    // graphics.drawPolygon([
    //   new Point(0, 0),
    //   new Point(100, 0),
    //   new Point(100, 100)]);

    // crtanje raznolih oblika
    // graphics.drawShape(new Circle(0, 0, 10));

    // za crtanje zvijezde
    // graphics.drawStar(0, 0, 5, 200, 100);

    // povuce zadnju liniju ako ona uopce nedostaje
    // graphics.closePath();

    // za crtanje kvadra
    // graphics.drawRect(0, 0, 100, 200);

    // za crtanje kruga
    // graphics.drawCircle(0, 0, 100);

    graphics.endFill();


    pixiApp.ticker.add(animate);

    let delta = 0;
    function animate() {
      delta += 0.1;
      radius = 50 + Math.sin(delta) * 25;

      graphics.clear();
      graphics.beginFill(0xff0000);
      graphics.arc(0, 0, radius, 0, Math.PI * 2);
      graphics.endFill();
    }
  }

}
