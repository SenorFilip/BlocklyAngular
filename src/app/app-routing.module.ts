import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop-component/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {PixiJsComponent} from './pixi-js/pixi-js.component';
import {PixiJsGraphicsComponent} from './pixi-js/pixi-js-graphics/pixi-js-graphics.component';
import {PixiJsFiltersComponent} from './pixi-js/pixi-js-filters/pixi-js-filters.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'foorLoopLesson', component: LessonForLoopComponent},
  {path: 'pixiJs', component: PixiJsComponent, children: [
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
