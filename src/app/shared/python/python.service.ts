import { Injectable } from '@angular/core';
import {AlertService} from '../alert';
import {Router} from '@angular/router';
declare let pyodide: any;

@Injectable({
  providedIn: 'root'
})
export class PythonService {

  pythonSetUpCode =
`from io import StringIO
import sys
from js import document

# Create the in-memory "file"
temp_out = StringIO()

# Replace default stdout (terminal) with our stream
sys.stdout = temp_out

# The original \`sys.stdout\` is kept in a special
# dunder named \`sys.__stdout__\`. So you can restore
# the original output stream to the terminal.
# sys.stdout = sys.__stdout__

# serves to check if lesson was solved
lessonPassed = False

# ------------------------- user code --------------------
`;

  memoryResetCode =
`
outputTextAreaElement = document.getElementById("consoleOutput")
outputTextAreaElement.value = temp_out.getvalue()

# ----------------------- end user code ------------------
# Deletes declared variables from memory
neededVariableSet = set({'output', '__annotations__', 'neededVariableSet', 'temp_out',
'sys', '__builtins__', 'StringIO', 'lessonPassed', 'outputTextAreaElement', 'js'})
myVariables = set(dir()) - set(dir(__builtins__)) - neededVariableSet
for varName in myVariables:
  del globals()[varName]`;

  constructor(private alertService: AlertService,
              private router: Router) { }

  runPythonCode(inputCode: string, lessonSolvedCheckCode: string) {
    try {
      // runs Python code
      this.alertService.clear();
      const pythonScript = this.pythonSetUpCode + inputCode + '\n' + lessonSolvedCheckCode + this.memoryResetCode;
      pyodide.runPython(pythonScript);
      if (pyodide.pyimport('lessonPassed')) {
        this.alertService.success('Good job!', {autoClose: true});
        setTimeout(() => this.router.navigate(['/']), 1800);
      }
    } catch (err) {
      this.alertService.error(err);
    }
  }

}
