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
      'listsAssignment',
      false
    ),
    new Lesson(
      3,
      'listsCode',
      false
    ),
    new Lesson(
      4,
      'operatorsAssignment',
      false
    ),
    new Lesson(
      5,
      'operatorsCode',
      false
    ),
    new Lesson(
      6,
      'conditionsAssignment',
      false
    ),
    new Lesson(
      7,
      'conditionsCode',
      false
    ),
    new Lesson(
      8,
      'loopBunny',
      false
    ),
    new Lesson(
      9,
      'loopCode',
      false
    ),
    new Lesson(
      10,
      'functionsAssignment',
      false
    ),
    new Lesson(
      11,
      'functionsCode',
      false
    ),
    new Lesson(
      12,
      'classesAssignment',
      false
    ),
    new Lesson(
      13,
      'classesCode',
      false
    ),
    new Lesson(
      14,
      'mapsAssignment',
      false
    ),
    new Lesson(
      15,
      'mapsCode',
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

  getAllLessons() {
    return this.lessonsSolved;
  }

}
