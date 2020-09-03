import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop/lesson-foor-loop-component/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LessonForLoopCodeComponent} from './lesson-foor-loop/lesson-for-loop-code/lesson-for-loop-code.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'foorLoopLesson', component: LessonForLoopComponent},
  {path: 'foorLoopLessonCode', component: LessonForLoopCodeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
