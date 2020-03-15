import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BlocklyComponent} from './blockly/blockly.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PixiJsComponent} from './pixi-js/pixi-js.component';
import {PixiJsIntroComponent} from './pixi-js/pixi-js-intro/pixi-js-intro.component';
import {PixiJsRendererComponent} from './pixi-js/pixi-js-renderer/pixi-js-renderer.component';
import {PixiJsTextureComponent} from './pixi-js/pixi-js-texture/pixi-js-texture.component';
import {PixiJsSpritesComponent} from './pixi-js/pixi-js-sprites/pixi-js-sprites.component';
import {PixiJsGraphicsComponent} from './pixi-js/pixi-js-graphics/pixi-js-graphics.component';
import {PixiJsFiltersComponent} from './pixi-js/pixi-js-filters/pixi-js-filters.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blockly', component: BlocklyComponent},
  {path: 'pixiJs', component: PixiJsComponent, children: [
      {path: 'intro', component: PixiJsIntroComponent},
      {path: 'renderer', component: PixiJsRendererComponent},
      {path: 'texture', component: PixiJsTextureComponent},
      {path: 'sprites', component: PixiJsSpritesComponent},
      {path: 'graphics', component: PixiJsGraphicsComponent},
      {path: 'filters', component: PixiJsFiltersComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
