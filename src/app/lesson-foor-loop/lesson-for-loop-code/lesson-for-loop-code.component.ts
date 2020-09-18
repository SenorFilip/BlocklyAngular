import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../shared/alert';
declare let pyodide: any;

@Component({
  selector: 'app-lesson-for-loop-code',
  templateUrl: './lesson-for-loop-code.component.html',
  styleUrls: ['./lesson-for-loop-code.component.scss']
})
export class LessonForLoopCodeComponent implements OnInit {

  codeInputField;
  consoleOutput;

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    this.codeInputField =
    'for number in range(1, 6, 1):' + '\n'
      + ' ' + 'print(number)';
  }

  runCode() {
    const pythonCode =
      'output = ""' + '\n'
      + this.codeInputField + '\n'
      + ' ' + "output += str(number) + '\\n'";
    // runs Python code
    pyodide.runPython(pythonCode);
    // retrieves variable value in which we saved the console output result
    this.consoleOutput = pyodide.globals.output;
    this.checkResult();
  }

  checkResult() {
    if (this.consoleOutput === ('24\n' + '21\n' + '18\n' + '15\n' + '12\n' + '9\n' + '6\n' + '3\n')) {
      this.alertService.success('Good job!');
    }
  }

}
