import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-conditions',
  templateUrl: './lesson-conditions.component.html',
  styleUrls: ['./lesson-conditions.component.scss']
})
export class LessonConditionsComponent implements OnInit {

  arrowRight = faAngleRight;
  arrowLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
