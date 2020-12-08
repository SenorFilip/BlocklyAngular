import { Injectable } from '@angular/core';
import {Lesson} from './lesson.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonSolvedService {

  lessonsChanged = new Subject<Lesson[]>();

  private lessonsSolved: Lesson[] = [
    new Lesson(
      0,
      'variableDragAndDrop',
      false
    ),
    new Lesson(
      1,
      'variableCode',
      false
    ),
    new Lesson(
      2,
      'loopBunny',
      false
    ),
    new Lesson(
      3,
      'loopCode',
      false
    )
  ];

  constructor() {}

  updateLesson(editedLesson: Lesson) {
    this.lessonsSolved[editedLesson.id] = editedLesson;
    this.lessonsChanged.next(this.lessonsSolved.slice());
  }

  getLesson(name: string) {
    return this.lessonsSolved.find((l) => l.name === name);
  }

}
