import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-dictionaries',
  templateUrl: './lesson-dictionaries.component.html',
  styleUrls: ['./lesson-dictionaries.component.scss']
})
export class LessonDictionariesComponent implements OnInit {

  arrowRight = faAngleRight;
  arrowLeft = faAngleLeft;

  constructor() { }

  ngOnInit(): void {
  }

}
