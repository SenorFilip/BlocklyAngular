import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {LessonForLoopComponent} from './lesson-foor-loop/lesson-foor-loop-component/lesson-for-loop.component';
import {HomePageComponent} from './home-page/home-page.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {NgxBlocklyModule} from 'ngx-blockly';
import { LessonForLoopCodeComponent } from './lesson-foor-loop/lesson-for-loop-code/lesson-for-loop-code.component';
import {AlertModule} from './shared/alert';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LessonForLoopComponent,
    HomePageComponent,
    DropdownDirective,
    LessonForLoopCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgxBlocklyModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
