import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lessons-objects',
  templateUrl: './lessons-objects.component.html',
  styleUrls: ['./lessons-objects.component.scss']
})
export class LessonsObjectsComponent implements OnInit {

  arrowLeft = faAngleLeft;
  arrowRight = faAngleRight;
  constructor() { }

  ngOnInit(): void {
  }

}
