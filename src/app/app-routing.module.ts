import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BlocklyComponent} from './blockly/blockly.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PixiJsComponent} from './pixi-js/pixi-js.component';
import {PixiJsIntroComponent} from './pixi-js/pixi-js-intro/pixi-js-intro.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blockly', component: BlocklyComponent},
  {path: 'pixiJs', component: PixiJsComponent, children: [
      {path: 'intro', component: PixiJsIntroComponent}
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
