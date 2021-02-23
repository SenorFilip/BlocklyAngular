import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PythonService} from '../../shared/python/python.service';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-for-loop-code',
  templateUrl: './lesson-loops-code.component.html',
  styleUrls: ['./lesson-loops-code.component.scss']
})
export class LessonLoopsCodeComponent implements OnInit {

  arrowLeft = faAngleLeft;

  lesson: Lesson;

  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  codeInputField;
  counter: number;
  counterArray: Array<number>;

  constructor(private pythonService: PythonService,
              private lessonSolvedService: LessonSolvedService) { }

  ngOnInit(): void {
    this.lesson = this.lessonSolvedService.getLesson('loopCode');

    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField = ``;
  }

  runCode() {
    const lessonSolvedCheckCode = `
lessonPassed = True
print('\\n')

if 'myList1' in locals():
    if myList1 != list(range(1, 21)):
        print('Your myList1 list is wrong')
        lessonPassed = False
else:
    print('You didn\\'t create the myList1 list')
    lessonPassed = False
if 'myList2' in locals():
    if myList2 != list(range(2, 21, 2)):
        print('Your myList2 list is wrong')
        lessonPassed = False
else:
    print('You didn\\'t create the myList2 list')
    lessonPassed = False
    `;
    this.pythonService.runPythonCode(this.codeInputField, lessonSolvedCheckCode, this.lesson);
  }

  onEnter(textAreaElement: HTMLTextAreaElement) {
    const contentRows = textAreaElement.value.split('\n').length;
    if (contentRows >= this.counter) {
      this.counter = ++textAreaElement.rows;
    }
    console.log('textarea.rows:', this.counter);
    this.counterArray = new Array(this.counter);
  }

  resetCode() {
    this.codeInputField = ``;
  }
}
