import { Component, OnInit } from '@angular/core';
import {Application, Container, Renderer, Sprite, Texture, Ticker, Point, BLEND_MODES} from 'pixi.js';
import {colors} from '@angular/cli/utilities/color';

@Component({
  selector: 'app-pixi-js-sprites',
  templateUrl: './pixi-js-sprites.component.html',
  styleUrls: ['./pixi-js-sprites.component.scss']
})
export class PixiJsSpritesComponent implements OnInit {

  title = 'Sprites';

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
    const bunnyTexture = Texture.from('assets/bunny.png');

    let sprite1;
    let sprite2;
    let sprite3;

    const img = new Sprite(texture);
    img.x = pixiApp.renderer.width / 2;
    img.y = pixiApp.renderer.height / 2;
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;
    pixiApp.stage.addChild(img);

    const container = new Container();
    pixiApp.stage.addChild(container);

    const sprites = [];
    addSprites();

    // sprite1 = new Sprite(bunnyTexture);

    // pozicija sprite-a
    // sprite1.position.set(pixiApp.renderer.width / 2, pixiApp.renderer.height / 2);

    // anchor metoda sluzi za pomicanje 0,0 koordinate sprite. znaci sve od skaliranja do pozicioniranja
    // ce se odvijati od te tocke nadalje
    // sprite1.anchor.set(0.5);
    // container.addChild(sprite1);

    // sprite2 = new Sprite(bunnyTexture);
    // sprite2.position.set(pixiApp.renderer.width / 2, pixiApp.renderer.height / 2);
    // sprite2.anchor.set(0.5);

    // bojanje
    // sprite2.tint = 0xff0000;
    // container.addChild(sprite2);

    // sprite3 = new Sprite(bunnyTexture);
    // sprite3.x = 200;
    // sprite3.y = 100;
    // sprite3.position.set(200, 100);
    // sprite3.anchor.set(0.5);

    // pivot metoda sluzi za postavljenja i micanje tocke oko koje ce se
    // odvijati akcije kao rotacija
    // sprite3.pivot.set(0, 100);

    // container.addChild(sprite3);

    pixiApp.ticker.add(animate);

    function addSprites() {
      for (let i = 0; i < 10; i++) {
        const sprite = new Sprite(bunnyTexture);
        sprite.x = Math.random() * pixiApp.renderer.width;
        sprite.y = Math.random() * pixiApp.renderer.height;
        sprite.anchor.set(0.5);
        sprite.tint = Math.random() * 0xffffff;
        container.addChild(sprite);
        sprites.push(sprite);
      }
    }

    let delta = 0;
    function animate() {
      delta += 0.1;

      for (const sprite of sprites) {
        sprite.rotation += 0.1;
      }
      // sprite2.x = pixiApp.renderer.width / 2 + Math.sin(delta) * 10;

      // mask ozancava podrucje vidlljivosti sprite-a
      // sprite1.mask = sprite2;

      // sprite1.y = 100 + Math.sin(delta) * 10;
      // sprite2.x = 100 + Math.sin(delta) * 10;

      // skaliranje velicine sprite-a
      // sprite3.scale = new Point(2, 2);

      // rotacija
      // sprite3.rotation += 0.1;

      // transparentnost
      // sprite1.alpha = Math.sin(delta);

      // za interakciju s sprite-om
      // sprite1.interactive = true;
      // sprite1.buttonMode = true;

      // vidljivost sprite-a
      // sprite1.visible = false;

      // sve bijele vrijednosti postanu transparentne
      // sprite1.blendMode = BLEND_MODES.MULTIPLY;

      // container.x = Math.sin(delta) * 10;
      // img.rotation = 0.1;
    }
  }

}
