import { Component, OnInit } from '@angular/core';
import { faAngleRight} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-data-types',
  templateUrl: './lesson-data-types.component.html',
  styleUrls: ['./lesson-data-types.component.scss']
})
export class LessonDataTypesComponent implements OnInit {

  angleRight = faAngleRight;

  constructor() { }

  ngOnInit(): void {
  }

}
