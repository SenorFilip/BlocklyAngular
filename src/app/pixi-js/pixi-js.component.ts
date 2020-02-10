import {Component, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Application, Sprite, Texture, Renderer, Container, Ticker} from 'pixi.js';

@Component({
  selector: 'app-pixi-js',
  templateUrl: './pixi-js.component.html',
  styleUrls: ['./pixi-js.component.scss']
})
export class PixiJsComponent implements OnInit, OnDestroy {

  // @ViewChild('pixiContainer', {static: true}) pixiContainer;
  // public pixiApp: Application;
  canvas;

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  // @Input()
  // public applicationOptions = {
  //   view: this.canvas,
  //   width: window.innerWidth * 0.9,
  //   height: window.innerHeight * 0.9,
  //   backgroundColor: 0x1099bb
  // };

  constructor(private elementRef: ElementRef,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas');

    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    // this.ngZone.runOutsideAngular(() => {
    const pixiApp = new Application({
      view: this.canvas,
      width: screenWidth * 0.5,
      height: screenHeight * 0.5,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      backgroundColor: 0x1099bb
    });

    // const renderer = new Renderer({
    //   view: this.canvas,
    //   width: screenWidth * 0.5,
    //   height: screenHeight * 0.5,
    //   resolution: window.devicePixelRatio,
    //   autoDensity: true,
    //   backgroundColor: 0x1099bb
    // });
    // });
    // this.resize();

    window.addEventListener('resize', () => {
      screenWidth = window.innerWidth * 0.5;
      screenHeight = window.innerHeight * 0.5;
      pixiApp.renderer.resize(screenWidth, screenHeight);
    });

    // const stage = new Container();

    const texture = Texture.from('assets/carrot.png');
    const img = new Sprite(texture);


    // img.anchor.x = 0.5;
    // img.anchor.y = 0.5;
    // pixiApp.stage.addChild(img);
    //
    // // const ticker = new Ticker();
    //
    // pixiApp.ticker.add(() => {
    // img.x = pixiApp.renderer.screen.width / 2;
    // img.y = pixiApp.renderer.screen.height / 2;
    //   img.rotation += 0.05;
    //   pixiApp.renderer.render(pixiApp.stage);
    // });
    // pixiApp.ticker.start();



    // const bunny = Sprite.from('assets/bunny.png');
//
// // center the sprite's anchor point
//     bunny.anchor.set(0.5);
//
// // move the sprite to the center of the screen
//     bunny.x = this.pixiApp.screen.width / 2;
//
//     bunny.y = this.pixiApp.screen.height / 2;
//     this.pixiApp.stage.addChild(bunny);
//
//     this.pixiApp.ticker.add((delta) => {
//
// // Listen for animate update
//       // just for fun, let's rotate mr rabbit a little
//       // delta is 1 if running at 100% performance
//       // creates frame-independent transformation
//       bunny.rotation += 0.05 * delta;
//     });

    // this.elementRef.nativeElement.appendChild(this.pixiApp.view);
    // document.body.appendChild(this.pixiApp.view);
  }

  // @HostListener('window:resize')
  // public resize() {
  //   const width = this.elementRef.nativeElement.offsetWidth;
  //   const height = this.elementRef.nativeElement.offsetHeight;
  //   const viewportScale = 1 / this.devicePixelRatio;
  //   this.pixiApp.renderer.resize(width * this.devicePixelRatio, height * this.devicePixelRatio);
  //   this.pixiApp.view.style.transform = `scale(${viewportScale})`;
  //   this.pixiApp.view.style.transformOrigin = `top left`;
  // }

  ngOnDestroy(): void {
    // this.pixiApp.destroy();
  }

}
