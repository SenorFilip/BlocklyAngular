import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-for-loop/lesson-for-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LessonForLoopCodeComponent} from './lesson-for-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {LessonVariablesComponent} from './lesson-variables/lesson-variables/lesson-variables.component';
import {LessonConditionsComponent} from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import {LessonDataTypesComponent} from './lesson-variables/lesson-data-types/lesson-data-types.component';
import {LessonVariablesAssignmentComponent} from './lesson-variables/lesson-variables-assignment/lesson-variables-assignment.component';
import {LessonVariablesCodeComponent} from './lesson-variables/lesson-variables-code/lesson-variables-code.component';
import {LessonListsAssignmentComponent} from './lesson-lists/lesson-lists-assignment/lesson-lists-assignment.component';
import {LessonBoolOperatorsAssignmentComponent} from './lesson-bool-operators/lesson-bool-operators-assignment/lesson-bool-operators-assignment.component';
import {LessonFunctionsAssignmentComponent} from './lesson-functions/lesson-functions-assignment/lesson-functions-assignment.component';
import {LessonClassesAssignmentComponent} from './lesson-classes/lesson-classes-assignment/lesson-classes-assignment.component';
import {LessonDictionariesAssignmentComponent} from './lesson-dictionaries/lesson-dictionaries-assignment/lesson-dictionaries-assignment.component';

const appRoutes: Routes = [
  {path: '', component: HomePageComponent, data: { lessonAnimationState: 0}},
  {path: 'dataTypesLesson', component: LessonDataTypesComponent, data: { animationState: '1', lessonAnimationState: 1}},
  {path: 'variablesLesson', component: LessonVariablesComponent, data: { animationState: '2', lessonAnimationState: 1}},
  {path: 'variablesAssignment', component: LessonVariablesAssignmentComponent, data: { animationState: '3', lessonAnimationState: 1}},
  {path: 'variablesLessonCode', component: LessonVariablesCodeComponent, data: { animationState: '4', lessonAnimationState: 1}},
  {path: 'listsAssignment', component: LessonListsAssignmentComponent, data: { animationState: '11', lessonAnimationState: 2}},
  {path: 'booleanOperatorsAssignment', component: LessonBoolOperatorsAssignmentComponent,
    data: { animationState: '21', lessonAnimationState: 3}},
  {path: 'conditionsLesson', component: LessonConditionsComponent, data: { animationState: '31', lessonAnimationState: 4}},
  {path: 'forLoopLesson', component: LessonForLoopComponent, data: { animationState: '41', lessonAnimationState: 5}},
  {path: 'forLoopLessonCode', component: LessonForLoopCodeComponent, data: { animationState: '42', lessonAnimationState: 5}},
  {path: 'functionsAssignment', component: LessonFunctionsAssignmentComponent, data: { animationState: '51', lessonAnimationState: 6}},
  {path: 'classesAssignment', component: LessonClassesAssignmentComponent, data: { animationState: '61', lessonAnimationState: 7}},
  {path: 'dictionariesAssignment', component: LessonDictionariesAssignmentComponent, data: { animationState: '71', lessonAnimationState: 8}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
