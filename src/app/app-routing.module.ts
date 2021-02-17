import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LessonForLoopComponent} from './lesson-for-loop/lesson-for-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {LessonForLoopCodeComponent} from './lesson-for-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {LessonVariablesComponent} from './lesson-variables/lesson-variables/lesson-variables.component';
import {LessonDataTypesComponent} from './lesson-variables/lesson-data-types/lesson-data-types.component';
import {LessonVariablesAssignmentComponent} from './lesson-variables/lesson-variables-assignment/lesson-variables-assignment.component';
import {LessonVariablesCodeComponent} from './lesson-variables/lesson-variables-code/lesson-variables-code.component';
import {LessonListsAssignmentComponent} from './lesson-lists/lesson-lists-assignment/lesson-lists-assignment.component';
import {LessonOperatorsAssignmentComponent} from './lesson-operators/lesson-operators-assignment/lesson-operators-assignment.component';
import {LessonFunctionsAssignmentComponent} from './lesson-functions/lesson-functions-assignment/lesson-functions-assignment.component';
import {LessonClassesAssignmentComponent} from './lesson-classes-objects/lesson-classes-assignment/lesson-classes-assignment.component';
import {LessonDictionariesAssignmentComponent} from './lesson-dictionaries/lesson-dictionaries-assignment/lesson-dictionaries-assignment.component';
import {RedirectComponent} from './redirect/redirect.component';
import {LessonConditionsAssignmentComponent} from './lesson-conditions/lesson-conditions-assignment/lesson-conditions-assignment.component';
import {LessonListsComponent} from './lesson-lists/lesson-lists/lesson-lists.component';
import {LessonListsCodeComponent} from './lesson-lists/lesson-lists-code/lesson-lists-code.component';
import {LessonOperatorsComponent} from './lesson-operators/lesson-operators/lesson-operators.component';
import {LessonOperatorsCodeComponent} from './lesson-operators/lesson-operators-code/lesson-operators-code.component';
import {LessonConditionsComponent} from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import {LessonConditionsCodeComponent} from './lesson-conditions/lesson-conditions-code/lesson-conditions-code.component';
import {LessonFunctionsComponent} from './lesson-functions/lesson-functions/lesson-functions.component';
import {LessonFunctionsCodeComponent} from './lesson-functions/lesson-functions-code/lesson-functions-code.component';
import {LessonClassesComponent} from './lesson-classes-objects/lesson-classes/lesson-classes.component';
import {LessonClassesCodeComponent} from './lesson-classes-objects/lesson-classes-code/lesson-classes-code.component';
import {LessonDictionariesComponent} from './lesson-dictionaries/lesson-dictionaries/lesson-dictionaries.component';
import {LessonDictionariesCodeComponent} from './lesson-dictionaries/lesson-dictionaries-code/lesson-dictionaries-code.component';
import {LessonsObjectsComponent} from './lesson-classes-objects/lessons-objects/lessons-objects.component';

const appRoutes: Routes = [
  {path: 'home', component: HomePageComponent, data: { lessonAnimationState: 0}},
  {path: 'dataTypesLesson', component: LessonDataTypesComponent, data: { animationState: '1', lessonAnimationState: 1}},
  {path: 'variablesLesson', component: LessonVariablesComponent, data: { animationState: '2', lessonAnimationState: 1}},
  {path: 'variablesAssignment', component: LessonVariablesAssignmentComponent, data: { animationState: '3', lessonAnimationState: 1}},
  {path: 'variablesAssignment/code', component: LessonVariablesCodeComponent, data: { animationState: '4', lessonAnimationState: 1}},
  {path: 'listsAssignment', component: LessonListsAssignmentComponent, data: { animationState: '11', lessonAnimationState: 2}},
  {path: 'listsLesson', component: LessonListsComponent, data: { animationState: '12', lessonAnimationState: 2}},
  {path: 'listsAssignment/code', component: LessonListsCodeComponent, data: { animationState: '13', lessonAnimationState: 2}},
  {path: 'operatorsAssignment', component: LessonOperatorsAssignmentComponent, data: { animationState: '21', lessonAnimationState: 3}},
  {path: 'operatorsLesson', component: LessonOperatorsComponent, data: { animationState: '22', lessonAnimationState: 3}},
  {path: 'operatorsAssignment/code', component: LessonOperatorsCodeComponent, data: { animationState: '23', lessonAnimationState: 3}},
  {path: 'conditionsAssignment', component: LessonConditionsAssignmentComponent, data: { animationState: '31', lessonAnimationState: 4}},
  {path: 'conditionsLesson', component: LessonConditionsComponent, data: { animationState: '32', lessonAnimationState: 4}},
  {path: 'conditionsAssignment/code', component: LessonConditionsCodeComponent, data: { animationState: '33', lessonAnimationState: 4}},
  {path: 'forLoopAssignment', component: LessonForLoopComponent, data: { animationState: '41', lessonAnimationState: 5}},
  {path: 'forLoopAssignment/code', component: LessonForLoopCodeComponent, data: { animationState: '42', lessonAnimationState: 5}},
  {path: 'functionsAssignment', component: LessonFunctionsAssignmentComponent, data: { animationState: '51', lessonAnimationState: 6}},
  {path: 'functionsLesson', component: LessonFunctionsComponent, data: { animationState: '52', lessonAnimationState: 6}},
  {path: 'functionsAssignment/code', component: LessonFunctionsCodeComponent, data: { animationState: '53', lessonAnimationState: 6}},
  {path: 'classesAssignment', component: LessonClassesAssignmentComponent, data: { animationState: '61', lessonAnimationState: 7}},
  {path: 'classesLesson', component: LessonClassesComponent, data: { animationState: '62', lessonAnimationState: 7}},
  {path: 'objectsLesson', component: LessonsObjectsComponent, data: { animationState: '63', lessonAnimationState: 7}},
  {path: 'classesAssignment/code', component: LessonClassesCodeComponent, data: { animationState: '64', lessonAnimationState: 7}},
  {path: 'dictionariesAssignment', component: LessonDictionariesAssignmentComponent,
    data: { animationState: '71', lessonAnimationState: 8}},
  {path: 'dictionariesLesson', component: LessonDictionariesComponent,
    data: { animationState: '72', lessonAnimationState: 8}},
  {path: 'dictionariesAssignment/code', component: LessonDictionariesCodeComponent,
    data: { animationState: '73', lessonAnimationState: 8}},
  {path: 'redirect/:path', component: RedirectComponent, data: { lessonAnimationState: 9}},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ]
})
export class AppRoutingModule { }
