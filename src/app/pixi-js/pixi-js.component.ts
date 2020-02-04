import {Component, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Application, Sprite} from 'pixi.js';

@Component({
  selector: 'app-pixi-js',
  templateUrl: './pixi-js.component.html',
  styleUrls: ['./pixi-js.component.scss']
})
export class PixiJsComponent implements OnInit, OnDestroy {

  // @ViewChild('pixiContainer', {static: true}) pixiContainer;
  public pixiApp: Application;

  @Input()
  public devicePixelRatio = window.devicePixelRatio || 1;

  @Input()
  public applicationOptions = {
    width: window.innerWidth * 0.75,
    height: window.innerHeight * 0.75,
    backgroundColor: 0x1099bb
  };

  constructor(private elementRef: ElementRef,
              private ngZone: NgZone) { }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.pixiApp = new Application(this.applicationOptions);
    });
    this.elementRef.nativeElement.appendChild(this.pixiApp.view);
    // this.resize();

    const bunny = Sprite.from('assets/bunny.png');

// center the sprite's anchor point
    bunny.anchor.set(0.5);

// move the sprite to the center of the screen
    bunny.x = this.pixiApp.screen.width / 2;
    bunny.y = this.pixiApp.screen.height / 2;

    this.pixiApp.stage.addChild(bunny);

// Listen for animate update
    this.pixiApp.ticker.add((delta) => {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      bunny.rotation += 0.05 * delta;
    });
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
    this.pixiApp.destroy();
  }

}
