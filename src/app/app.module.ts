import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {BlocklyComponent} from './blockly/blockly.component';
import {PixiJsComponent} from './pixi-js/pixi-js.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {PixiJsIntroComponent} from './pixi-js/pixi-js-intro/pixi-js-intro.component';
import {PixiJsRendererComponent} from './pixi-js/pixi-js-renderer/pixi-js-renderer.component';
import {PixiJsTextureComponent} from './pixi-js/pixi-js-texture/pixi-js-texture.component';
import {PixiJsSpritesComponent} from './pixi-js/pixi-js-sprites/pixi-js-sprites.component';
import {PixiJsGraphicsComponent} from './pixi-js/pixi-js-graphics/pixi-js-graphics.component';
import {PixiJsFiltersComponent} from './pixi-js/pixi-js-filters/pixi-js-filters.component';
import {NgxBlocklyModule} from 'ngx-blockly';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocklyComponent,
    PixiJsComponent,
    HomePageComponent,
    DropdownDirective,
    PixiJsIntroComponent,
    PixiJsRendererComponent,
    PixiJsTextureComponent,
    PixiJsSpritesComponent,
    PixiJsGraphicsComponent,
    PixiJsFiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxBlocklyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
