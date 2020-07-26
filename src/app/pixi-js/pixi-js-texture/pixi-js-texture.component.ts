import {Component, OnInit} from '@angular/core';
import {Application, Loader, Sprite, utils} from 'pixi.js';

@Component({
  selector: 'app-pixi-js-texture',
  templateUrl: './pixi-js-texture.component.html',
  styleUrls: ['./pixi-js-texture.component.scss']
})
export class PixiJsTextureComponent implements OnInit {

  title = 'Texture Loading';
  texturesLoaded = false;

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

    console.log(utils.TextureCache);

    const loader = Loader.shared;

    // loader.onComplete.add(handleLoadComplete);
    loader.onLoad.add(handleLoadAsset);
    loader.onError.add(handleLoadError);
    loader.onProgress.add(handleLoadProgress);

    loader.add('carrot', 'assets/carrot.png')
        .add('bunny', 'assets/bunny.png')
        // .on('progress', handleLoadProgress)
        // .on('load', handleLoadAsset)
        // .on('error', handleLoadError)
        .load(handleLoadComplete);

    let img;

    function handleLoadProgress(loader, resource) {
      console.log(loader.progress + '% loaded');
    }

    function handleLoadAsset(loader, resource) {
      console.log('Asset loaded ' + resource.name);
    }

    function handleLoadError() {
      console.error('Load error');
    }

    function handleLoadComplete() {
      const texture = loader.resources.carrot.texture;
      img = new Sprite(texture);
      img.anchor.x = 0.5;
      img.anchor.y = 0.5;
      pixiApp.stage.addChild(img);

      pixiApp.ticker.add(animate);

      setTimeout(() => {
        img.texture = loader.resources.bunny.texture;
      }, 2000);
    }

    function animate() {
      img.x = pixiApp.renderer.width / 2;
      img.y = pixiApp.renderer.height / 2;
      img.rotation += 0.1;
    }

  }

}
