import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-dictionaries-code',
  templateUrl: './lesson-dictionaries-code.component.html',
  styleUrls: ['./lesson-dictionaries-code.component.scss']
})
export class LessonDictionariesCodeComponent implements OnInit {

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
    this.lesson = this.lessonSolvedService.getLesson('mapsCode');

    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField =
`grades = {
"John" : 1,
"Jack" : 5,
"Jill" : 3,
"Steve" : 4,
"Marie" : 4,
"Mark" : 5,
"Ryan" : 2
}`;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
print('\\n')

if "Steve" in grades:
    print("You didn\\'t remove Steve from the grades map")
    lessonPassed = False
if grades['Ryan'] != 3:
    print("You didn\\'t change Ryan's grade")
    lessonPassed = False
if not 'averageGrade' in locals():
    print('You didn\\'t define averageGrade or you named it wrong')
    lessonPassed = False
else:
    if averageGrade != 3.5:
        print('Your average grade is wrong')
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
    this.codeInputField =
`grades = {
"John" : 1,
"Jack" : 5,
"Jill" : 3,
"Steve" : 4,
"Marie" : 4,
"Mark" : 5,
"Ryan" : 2
}`;
  }

}
