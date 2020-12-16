import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PythonService} from '../../shared/python/python.service';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-variables-code',
  templateUrl: './lesson-variables-code.component.html',
  styleUrls: ['./lesson-variables-code.component.scss']
})
export class LessonVariablesCodeComponent implements OnInit {

  arrowLeft = faAngleLeft;

  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  codeInputField;
  consoleOutput;
  counter: number;
  counterArray: Array<number>;

  constructor(private pythonService: PythonService) { }

  ngOnInit(): void {
    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField = '';
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
if 'myString' in locals():
    if not isinstance(myString, str) or myString != 'hello':
        lessonPassed = False
        print('myString variable is wrong type or has a wrong value.')
else:
    print('Missing myString variable.')
    lessonPassed = False

if 'myFloat' in locals():
    if not isinstance(myFloat, float) or myFloat != 10.0:
        lessonPassed = False
        print('myFloat variable is wrong type or has a wrong value.')
else:
    print('Missing myFloat variable.')
    lessonPassed = False


if 'myInt' in locals():
    if not isinstance(myInt, int) or myInt != 20:
        lessonPassed = False
        print('myInt variable is wrong type or has a wrong value.')
else:
    print('Missing myInt variable.')
    lessonPassed = False

if 'myBoolean' in locals():
    if not isinstance(myBoolean, bool) or myBoolean != False:
        lessonPassed = False
        print('myBoolean variable is wrong type or has a wrong value.')
else:
    print('Missing myBoolean variable.')
    lessonPassed = False
`;
    this.consoleOutput = this.pythonService.runPythonCode(this.codeInputField, checkResultCode);
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
    this.codeInputField = '';
  }

}
