import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {LessonForLoopComponent} from './lesson-for-loop/lesson-for-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {NgxBlocklyModule} from 'ngx-blockly';
import { LessonForLoopCodeComponent } from './lesson-for-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {AlertModule} from './shared/alert';
import {FormsModule} from '@angular/forms';
import { LessonConditionsComponent } from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import { LessonVariablesComponent } from './lesson-variables/lesson-variables/lesson-variables.component';
import { LessonDataTypesComponent } from './lesson-variables/lesson-data-types/lesson-data-types.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LessonVariablesAssignmentComponent } from './lesson-variables/lesson-variables-assignment/lesson-variables-assignment.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LessonVariablesCodeComponent } from './lesson-variables/lesson-variables-code/lesson-variables-code.component';
import { LessonBoolOperatorsAssignmentComponent } from './lesson-bool-operators/lesson-bool-operators-assignment/lesson-bool-operators-assignment.component';
import { LessonListsAssignmentComponent } from './lesson-lists/lesson-lists-assignment/lesson-lists-assignment.component';
import { LessonFunctionsAssignmentComponent } from './lesson-functions/lesson-functions-assignment/lesson-functions-assignment.component';
import { LessonClassesAssignmentComponent } from './lesson-classes/lesson-classes-assignment/lesson-classes-assignment.component';
import { LessonDictionariesAssignmentComponent } from './lesson-dictionaries/lesson-dictionaries-assignment/lesson-dictionaries-assignment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonForLoopComponent,
    HomePageComponent,
    DropdownDirective,
    LessonForLoopCodeComponent,
    LessonConditionsComponent,
    LessonVariablesComponent,
    LessonDataTypesComponent,
    LessonVariablesAssignmentComponent,
    LessonVariablesCodeComponent,
    LessonBoolOperatorsAssignmentComponent,
    LessonListsAssignmentComponent,
    LessonFunctionsAssignmentComponent,
    LessonClassesAssignmentComponent,
    LessonDictionariesAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxBlocklyModule,
    AlertModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
