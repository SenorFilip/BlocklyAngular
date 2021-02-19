import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';

@Component({
  selector: 'app-lesson-conditions-code',
  templateUrl: './lesson-conditions-code.component.html',
  styleUrls: ['./lesson-conditions-code.component.scss']
})
export class LessonConditionsCodeComponent implements OnInit {

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

    this.codeInputField =
      `age = 7
eyeColor = "green"
character = "brave"

if age > 9:
\tif eyeColor == "green":
\t\tprint("Slytherin")
\telif eyeColor == "brown" and character == "brave":
\t\tprint("Gryffindor")
\telif character == "shy":
\t\tprint("Ravenclaw")
\telse:
\t\tprint("Hufflepuff")
else:
\tprint("You're too young.")`;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = temp_out.getvalue() == 'Ravenclaw\\n'
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
    this.codeInputField =
      `age = 7
eyeColor = "green"
character = "brave"

if age > 9:
\tif eyeColor == "green":
\t\tprint("Slytherin")
\telif eyeColor == "brown" and character == "brave":
\t\tprint("Gryffindor")
\telif character == "shy":
\t\tprint("Ravenclaw")
\telse:
\t\tprint("Hufflepuff")
else:
\tprint("You're too young.")`;
  }

}
