import { Component, OnInit } from '@angular/core';
// import {PythonShell} from 'python-shell';


@Component({
  selector: 'app-lesson-for-loop-code',
  templateUrl: './lesson-for-loop-code.component.html',
  styleUrls: ['./lesson-for-loop-code.component.scss']
})
export class LessonForLoopCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // PythonShell.runString('x=1+1;print(x)', null, function (err) {
    //   if (err) throw err;
    //   console.log('finished');
    // const {PythonShell} = require('python-shell');
    // PythonShell.runString('x=1+1;print(x)', null, (err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   console.log('finished');
    // });
  }

}
