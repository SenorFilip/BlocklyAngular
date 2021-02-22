import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {LessonLoopsAssignmentComponent} from './lesson-loops/lesson-loops-assignment/lesson-loops-assignment.component';
import {HomePageComponent} from './home-page/home-page.component';
import {NgxBlocklyModule} from 'ngx-blockly';
import {LessonLoopsCodeComponent} from './lesson-loops/lesson-loops-code/lesson-loops-code.component';
import {AlertModule} from './shared/alert';
import {FormsModule} from '@angular/forms';
import {LessonVariablesComponent} from './lesson-variables/lesson-variables/lesson-variables.component';
import {LessonDataTypesComponent} from './lesson-variables/lesson-data-types/lesson-data-types.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LessonVariablesAssignmentComponent} from './lesson-variables/lesson-variables-assignment/lesson-variables-assignment.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LessonVariablesCodeComponent} from './lesson-variables/lesson-variables-code/lesson-variables-code.component';
import {LessonOperatorsAssignmentComponent} from './lesson-operators/lesson-operators-assignment/lesson-operators-assignment.component';
import {LessonListsAssignmentComponent} from './lesson-lists/lesson-lists-assignment/lesson-lists-assignment.component';
import {LessonFunctionsAssignmentComponent} from './lesson-functions/lesson-functions-assignment/lesson-functions-assignment.component';
import {LessonClassesAssignmentComponent} from './lesson-classes-objects/lesson-classes-assignment/lesson-classes-assignment.component';
import {LessonDictionariesAssignmentComponent} from './lesson-dictionaries/lesson-dictionaries-assignment/lesson-dictionaries-assignment.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RedirectComponent} from './redirect/redirect.component';
import {LessonConditionsAssignmentComponent} from './lesson-conditions/lesson-conditions-assignment/lesson-conditions-assignment.component';
import { LessonListsComponent } from './lesson-lists/lesson-lists/lesson-lists.component';
import { LessonListsCodeComponent } from './lesson-lists/lesson-lists-code/lesson-lists-code.component';
import { LessonOperatorsComponent } from './lesson-operators/lesson-operators/lesson-operators.component';
import { LessonOperatorsCodeComponent } from './lesson-operators/lesson-operators-code/lesson-operators-code.component';
import { LessonConditionsCodeComponent } from './lesson-conditions/lesson-conditions-code/lesson-conditions-code.component';
import { LessonConditionsComponent } from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import { LessonFunctionsComponent } from './lesson-functions/lesson-functions/lesson-functions.component';
import { LessonFunctionsCodeComponent } from './lesson-functions/lesson-functions-code/lesson-functions-code.component';
import { LessonClassesComponent } from './lesson-classes-objects/lesson-classes/lesson-classes.component';
import { LessonClassesCodeComponent } from './lesson-classes-objects/lesson-classes-code/lesson-classes-code.component';
import { LessonDictionariesComponent } from './lesson-dictionaries/lesson-dictionaries/lesson-dictionaries.component';
import { LessonDictionariesCodeComponent } from './lesson-dictionaries/lesson-dictionaries-code/lesson-dictionaries-code.component';
import { LessonsObjectsComponent } from './lesson-classes-objects/lessons-objects/lessons-objects.component';
import { LessonLoopsComponent } from './lesson-loops/lesson-loops/lesson-loops.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonLoopsAssignmentComponent,
    HomePageComponent,
    LessonLoopsCodeComponent,
    LessonVariablesComponent,
    LessonDataTypesComponent,
    LessonVariablesAssignmentComponent,
    LessonVariablesCodeComponent,
    LessonOperatorsAssignmentComponent,
    LessonListsAssignmentComponent,
    LessonFunctionsAssignmentComponent,
    LessonClassesAssignmentComponent,
    LessonDictionariesAssignmentComponent,
    RedirectComponent,
    LessonConditionsAssignmentComponent,
    LessonListsComponent,
    LessonListsCodeComponent,
    LessonOperatorsComponent,
    LessonOperatorsCodeComponent,
    LessonConditionsCodeComponent,
    LessonConditionsComponent,
    LessonFunctionsComponent,
    LessonFunctionsCodeComponent,
    LessonClassesComponent,
    LessonClassesCodeComponent,
    LessonDictionariesComponent,
    LessonDictionariesCodeComponent,
    LessonsObjectsComponent,
    LessonLoopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxBlocklyModule,
    AlertModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
