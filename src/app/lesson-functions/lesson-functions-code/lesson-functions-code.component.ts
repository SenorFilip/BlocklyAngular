import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-functions-code',
  templateUrl: './lesson-functions-code.component.html',
  styleUrls: ['./lesson-functions-code.component.scss']
})
export class LessonFunctionsCodeComponent implements OnInit {

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
    this.lesson = this.lessonSolvedService.getLesson('functionsCode');

    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField = ``;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
print('\\n')
try:
    calculateRest
except NameError:
    print('You didn\\'t define calculateRest or you named it wrong')
    lessonPassed = False
else:
    functionSpecs = inspect.getfullargspec(calculateRest)
    if functionSpecs.args != ['totalValue', 'percentage']:
        print('Your parameters are wrong')
        lessonPassed = False

if 'result' in locals():
    if result != 80:
        print('Your function returns a wrong value')
        lessonPassed = False
else:
    print('You didn\\'t create the result variable')
    lessonPassed = False
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
    this.codeInputField = ``;
  }

}
