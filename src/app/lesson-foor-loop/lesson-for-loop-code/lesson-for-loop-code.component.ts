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
`for number in range(1, 6, 1):
  print(number)`;
  }

  runCode() {
    const pythonCode =
`from io import StringIO
import sys

# Create the in-memory "file"
temp_out = StringIO()

# Replace default stdout (terminal) with our stream
sys.stdout = temp_out

# The original \`sys.stdout\` is kept in a special
# dunder named \`sys.__stdout__\`. So you can restore
# the original output stream to the terminal.
# sys.stdout = sys.__stdout__
` + this.codeInputField + '\n' +
`output = temp_out.getvalue()`;

    try {
      // runs Python code
      pyodide.runPython(pythonCode);
    } catch (err) {
      this.alertService.error(err);
      console.log(err);
    }

    // retrieves variable value in which we saved the console output result
    this.consoleOutput = pyodide.globals.output;
    // const stdout = pyodide.runPython('sys.stdout.getvalue()');
    // console.log(stdout);
    this.checkResult();
  }

  checkResult() {
    if (this.consoleOutput === ('24\n' + '21\n' + '18\n' + '15\n' + '12\n' + '9\n' + '6\n' + '3\n')) {
      this.alertService.success('Good job!');
    }
  }

}
