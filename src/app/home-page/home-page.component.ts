import { Component, OnInit } from '@angular/core';
import {LessonSolvedService} from '../shared/lesson/lesson-solved.service';
import {Lesson} from '../shared/lesson/lesson.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  lessonsSolved: Lesson[];

  constructor(private lessonSolvedService: LessonSolvedService) { }

  ngOnInit() {
    this.lessonsSolved = this.lessonSolvedService.getAllLessons();
  }

}
