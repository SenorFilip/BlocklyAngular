import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertService} from '../../shared/alert';
declare let pyodide: any;

@Component({
  selector: 'app-lesson-for-loop-code',
  templateUrl: './lesson-for-loop-code.component.html',
  styleUrls: ['./lesson-for-loop-code.component.scss']
})
export class LessonForLoopCodeComponent implements OnInit {
  @ViewChild('textarea', {static: true}) textarea: ElementRef;

  codeInputField;
  consoleOutput;
  counter: number;
  counterArray: Array<number>;

  constructor(public alertService: AlertService) { }

  ngOnInit(): void {
    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

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
`output = temp_out.getvalue()

# Deletes declared variables from memory
neededVariableSet = set({'output', '__annotations__', 'neededVariableSet', 'temp_out', 'sys', '__builtins__', 'StringIO'})
myVariables = set(dir()) - set(dir(__builtins__)) - neededVariableSet
for varName in myVariables:
  del globals()[varName]
`;

    try {
      // runs Python code
      this.alertService.clear();
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
      this.alertService.success('Good job!', {autoClose: true});
    }
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
