import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-bool-operators-code',
  templateUrl: './lesson-operators-code.component.html',
  styleUrls: ['./lesson-operators-code.component.scss']
})
export class LessonOperatorsCodeComponent implements OnInit {

  arrowLeft = faAngleLeft;

  lesson: Lesson;

  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  codeInputField;
  consoleOutput;
  counter: number;
  counterArray: Array<number>;

  constructor(private pythonService: PythonService,
              private lessonSolvedService: LessonSolvedService) { }

  ngOnInit(): void {
    this.lesson = this.lessonSolvedService.getLesson('operatorsCode');

    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField =
      `value1 = #
task1 = value1 < 15 and value1 > 9
print(task1)

value2 = #
task2 = value2 >= 8 or value2 < 9
print(task2)

value3 = #
task3 = value3 == (not (( 2 <= 4 and 6 < 5) or 1 == 1))
print(task3)`;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
print('\\n')
if task1 == False:
  lessonPassed = False
  print('value1 is wrong.')
if task2 == False:
  lessonPassed = False
  print('value2 is wrong.')
if task3 == False:
  lessonPassed = False
  print('value3 is wrong.')
`;
    this.consoleOutput = this.pythonService.runPythonCode(this.codeInputField, checkResultCode, this.lesson);
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
    this.codeInputField =
      `value1 = #
task1 = value1 < 15 and value1 > 9
print(task1)

value2 = #
task2 = value2 >= 8 or value2 < 9
print(task2)

value3 = #
task3 = value3 == (not (( 2 <= 4 and 6 < 5) or 1 == 1))
print(task3)`;
  }

}
