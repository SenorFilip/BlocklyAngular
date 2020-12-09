import { Injectable } from '@angular/core';
import {AlertService} from '../alert';
declare let pyodide: any;

@Injectable({
  providedIn: 'root'
})
export class PythonService {

  pythonSetUpCode =
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

# serves to check if lesson was solved
lessonPassed = False

# ------------------------- user code --------------------
`;

  outputVariableCode = `\noutput = temp_out.getvalue()\n`;

  memoryResetCode =
`
# ----------------------- end user code ------------------
# Deletes declared variables from memory
neededVariableSet = set({'output', '__annotations__', 'neededVariableSet', 'temp_out', 'sys', '__builtins__', 'StringIO', 'lessonPassed'})
myVariables = set(dir()) - set(dir(__builtins__)) - neededVariableSet
for varName in myVariables:
  del globals()[varName]`;

  constructor(private alertService: AlertService) { }

  runPythonCode(inputCode: string, lessonSolvedCheckCode: string) {
    try {
      // runs Python code
      this.alertService.clear();
      const pythonScript = this.pythonSetUpCode + inputCode + '\n' + lessonSolvedCheckCode + this.outputVariableCode + this.memoryResetCode;
      // console.log(pythonScript);
      pyodide.runPython(pythonScript);
      if (pyodide.globals.lessonPassed) {
        this.alertService.success('Good job!', {autoClose: true});
      }
      // retrieves variable value in which we saved the console output result
      return pyodide.globals.output;
    } catch (err) {
      this.alertService.error(err);
      // retrieves variable value in which we saved the console output result
      return pyodide.globals.output;
    }

    // const stdout = pyodide.runPython('sys.stdout.getvalue()');
    // console.log(stdout);
  }

}
