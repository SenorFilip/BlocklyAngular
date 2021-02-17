import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-lists',
  templateUrl: './lesson-lists.component.html',
  styleUrls: ['./lesson-lists.component.scss']
})
export class LessonListsComponent implements OnInit {

  arrowRight = faAngleRight;
  arrowLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
