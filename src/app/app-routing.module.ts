import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop/lesson-foor-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LessonForLoopCodeComponent} from './lesson-foor-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {LessonVariablesComponent} from './lesson-variables/lesson-variables/lesson-variables.component';
import {LessonConditionsComponent} from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import {LessonDataTypesComponent} from './lesson-variables/lesson-data-types/lesson-data-types.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'foorLoopLesson', component: LessonForLoopComponent},
  {path: 'foorLoopLessonCode', component: LessonForLoopCodeComponent},
  {path: 'dataTypesLesson', component: LessonDataTypesComponent},
  {path: 'variablesLesson', component: LessonVariablesComponent},
  {path: 'conditionsLesson', component: LessonConditionsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
