import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';

@Component({
  selector: 'app-lesson-lists-code',
  templateUrl: './lesson-lists-code.component.html',
  styleUrls: ['./lesson-lists-code.component.scss']
})
export class LessonListsCodeComponent implements OnInit {

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
      `numbers = []
strings = []
second_name = ''
names = ["John", "Eric", "Jessica"]

# write your code here

# this code should write out the filled arrays and the second name in the names list (Eric).
print(numbers)
print(strings)
print("The second name on the names list is %s" % second_name)`;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
print('\\n')
if strings != ['hello', 'world']:
  lessonPassed = False
  print('Your strings list is wrong.')
if numbers != [1, 2, 3]:
  lessonPassed = False
  print('Your numbers list is wrong.')
if second_name != names[1]:
  lessonPassed = False
  print('Your second_name variable is wrong.')
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
    this.codeInputField = `numbers = []
strings = []
second_name = ''
names = ["John", "Eric", "Jessica"]

# write your code here

# this code should write out the filled arrays and the second name in the names list (Eric).
print(numbers)
print(strings)
print("The second name on the names list is %s" % second_name)`;
  }

}
