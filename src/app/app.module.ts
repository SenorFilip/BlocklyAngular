import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import { BlocklyComponent } from './blockly/blockly.component';
import { PixiJsComponent } from './pixi-js/pixi-js.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { PixiJsIntroComponent } from './pixi-js/pixi-js-intro/pixi-js-intro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocklyComponent,
    PixiJsComponent,
    HomePageComponent,
    DropdownDirective,
    PixiJsIntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
