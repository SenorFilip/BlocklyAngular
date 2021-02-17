import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-classes',
  templateUrl: './lesson-classes.component.html',
  styleUrls: ['./lesson-classes.component.scss']
})
export class LessonClassesComponent implements OnInit {

  arrowRight = faAngleRight;
  arrowLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
