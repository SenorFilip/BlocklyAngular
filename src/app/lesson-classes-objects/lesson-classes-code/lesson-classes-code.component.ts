import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {PythonService} from '../../shared/python/python.service';
import {Lesson} from '../../shared/lesson/lesson.model';
import {LessonSolvedService} from '../../shared/lesson/lesson-solved.service';

@Component({
  selector: 'app-lesson-classes-code',
  templateUrl: './lesson-classes-code.component.html',
  styleUrls: ['./lesson-classes-code.component.scss']
})
export class LessonClassesCodeComponent implements OnInit {

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
    this.lesson = this.lessonSolvedService.getLesson('classesCode');

    this.counter = this.textarea.nativeElement.rows;
    this.counterArray = new Array(this.counter);

    this.codeInputField = ``;
  }

  runCode() {
    const checkResultCode = `
lessonPassed = True
print('\\n')

if not 'Vehicle' in dir():
    print('You didn\\'t define Vehicle class or you named it wrong')
    lessonPassed = False
else:
    if not hasattr(Vehicle, 'kind') or not hasattr(Vehicle, 'color') or not hasattr(Vehicle, 'value'):
        print('Your class doesn\\'t have the right variables or you named them wrong')
        lessonPassed = False
    else:
        if 'v1' in locals():
            if v1.kind != 'car' or v1.color != 'red' or v1.value != 45000:
                print('Your v1 object has wrong parameters')
                lessonPassed = False
        else:
            print('You didn\\'t create the v1 object')
            lessonPassed = False
        if 'v2' in locals():
            if v2.kind != 'van' or v2.color != 'green' or v2.value != 50000:
                print('Your v2 object has wrong parameters')
                lessonPassed = False
        else:
            print('You didn\\'t create the v2 object')
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
