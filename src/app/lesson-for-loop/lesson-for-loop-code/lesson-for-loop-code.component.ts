import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PythonService} from '../../shared/python/python.service';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lesson-for-loop-code',
  templateUrl: './lesson-for-loop-code.component.html',
  styleUrls: ['./lesson-for-loop-code.component.scss']
})
export class LessonForLoopCodeComponent implements OnInit {

  // font awesome icon
  arrowLeft = faAngleLeft;

  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  codeInputField;
  counter: number;
  counterArray: Array<number>;

  constructor(private pythonService: PythonService) { }

  ngOnInit(): void {
    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField =
`for number in range(1, 6, 1):
  print(number)`;
  }

  runCode() {
    const lessonSolvedCheckCode = `\nlessonPassed = temp_out.getvalue() == '24\\n21\\n18\\n15\\n12\\n9\\n6\\n3\\n'\n`;
    this.pythonService.runPythonCode(this.codeInputField, lessonSolvedCheckCode);
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
`for number in range(1, 6, 1):
  print(number)`;
  }
}
