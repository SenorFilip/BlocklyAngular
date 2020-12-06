import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop/lesson-foor-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LessonForLoopCodeComponent} from './lesson-foor-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {LessonVariablesComponent} from './lesson-variables/lesson-variables/lesson-variables.component';
import {LessonConditionsComponent} from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import {LessonDataTypesComponent} from './lesson-variables/lesson-data-types/lesson-data-types.component';
import {LessonVariablesAssignmentComponent} from './lesson-variables/lesson-variables-assignment/lesson-variables-assignment.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, data: { lessonAnimationState: 0}},
  {path: 'dataTypesLesson', component: LessonDataTypesComponent, data: { animationState: 'one', lessonAnimationState: 1}},
  {path: 'variablesLesson', component: LessonVariablesComponent, data: { animationState: 'two', lessonAnimationState: 1}},
  {path: 'variablesAssignment', component: LessonVariablesAssignmentComponent, data: { animationState: 'three', lessonAnimationState: 1}},
  {path: 'conditionsLesson', component: LessonConditionsComponent, data: { lessonAnimationState: 2}},
  {path: 'forLoopLesson', component: LessonForLoopComponent, data: { animationState: 'one', lessonAnimationState: 3}},
  {path: 'forLoopLessonCode', component: LessonForLoopCodeComponent, data: { animationState: 'two', lessonAnimationState: 3}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
