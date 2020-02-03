import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BlocklyComponent} from './blockly/blockly.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PixiJsComponent} from './pixi-js/pixi-js.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'blockly', component: BlocklyComponent},
  {path: 'pixiJs', component: PixiJsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
