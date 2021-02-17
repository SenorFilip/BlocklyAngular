import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-bool-operators',
  templateUrl: './lesson-operators.component.html',
  styleUrls: ['./lesson-operators.component.scss']
})
export class LessonOperatorsComponent implements OnInit {

  arrowRight = faAngleRight;
  arrowLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
