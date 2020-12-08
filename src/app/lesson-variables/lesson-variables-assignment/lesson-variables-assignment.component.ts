import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {AlertService} from '../../shared/alert';
import {Router} from '@angular/router';
import {Lesson} from '../../shared/lesson/lesson.model';
import {Subscription} from 'rxjs';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-variables-assignment',
  templateUrl: './lesson-variables-assignment.component.html',
  styleUrls: ['./lesson-variables-assignment.component.scss']
})
export class LessonVariablesAssignmentComponent implements OnInit {

  lesson: Lesson;
  private lessonChangedSub: Subscription;

  items = [
    '" \' "',
    '.6',
    '0.00',
    '0700',
    '5',
    '"Bart"',
    'Marge',
    '7.',
    'homer',
    'False',
    '\'Bart\'s Skateboard\'',
    '\'flanders\'',
    '0',
    'True',
    '1.class',
    '"x"y"',
    'second-class',
    '1.7',
    'third_class',
    'FALSE'
  ];

  integer = [];
  float = [];
  string = [];
  boolean = [];
  variable = [];
  error = [];

  integerSolved = ['5', '0'];
  floatSolved = ['1.7', '7.', '.6', '0.00'];
  stringSolved = ['\'flanders\'', '"Bart"', '" \' "'];
  booleanSolved = ['True', 'False'];
  variableSolved = ['homer', 'Marge', 'third_class', 'FALSE'];
  errorSolved = ['0700', '\'Bart\'s Skateboard\'', '"x"y"', '1.class', 'second-class'];

  constructor(public alertService: AlertService,
              private router: Router,
              private lessonSolvedService: LessonSolvedService) { }

  ngOnInit(): void {
    this.lesson = this.lessonSolvedService.getLesson('variableDragAndDrop');
    this.lessonChangedSub = this.lessonSolvedService.lessonsChanged.subscribe(
      (lessonsSolved: Lesson[]) => {
        this.lesson = lessonsSolved[this.lesson.id];
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  // checks results and displays corresponding alerts
  checkResults() {
    if (this.items.length !== 0) {
      this.alertService.error('Still some items left to assign.', {autoClose: true});
      // const integerListSorted = this.integer.sort();
      // console.log(integerListSorted);
    } else {
      let isAnswerCorrect = true;
      this.integer.forEach(item => {
        if (this.integerSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' is not a Integer value.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });
      this.float.forEach(item => {
        if (this.floatSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' is not a Float value.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });
      this.string.forEach(item => {
        if (this.stringSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' is not a String value.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });
      this.boolean.forEach(item => {
        if (this.booleanSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' is not a Boolean value.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });
      this.variable.forEach(item => {
        if (this.variableSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' can\'t be a variable name.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });
      this.error.forEach(item => {
        if (this.errorSolved.indexOf(item) === -1) {
          this.alertService.error('Wrong! ' + item + ' is not a Error.', {autoClose: true});
          isAnswerCorrect = false;
        }
      });

      if (isAnswerCorrect) {
        // sets lesson as solved
        this.lesson.isSolved = true;
        this.lessonSolvedService.updateLesson(this.lesson);
        this.alertService.success('Nice job. You\'re being transported to the next assignment');
        setTimeout(() => this.router.navigate(['variablesLessonCode']), 1800);
      }
    }
  }

}
