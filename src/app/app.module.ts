import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop/lesson-foor-loop/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {NgxBlocklyModule} from 'ngx-blockly';
import { LessonForLoopCodeComponent } from './lesson-foor-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {AlertModule} from './shared/alert';
import {FormsModule} from '@angular/forms';
import { LessonConditionsComponent } from './lesson-conditions/lesson-conditions/lesson-conditions.component';
import { LessonVariablesComponent } from './lesson-variables/lesson-variables/lesson-variables.component';
import { LessonDataTypesComponent } from './lesson-variables/lesson-data-types/lesson-data-types.component';

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
    LessonDataTypesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxBlocklyModule,
    AlertModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
