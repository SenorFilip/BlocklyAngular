import { Component, OnInit } from '@angular/core';
import { toolbox } from './toolbox';

declare var Blockly: any;

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {

  code: string;
  workspace: any;
  // blocklyDiv: HTMLElement;

  constructor() { }

  ngOnInit() {
    // this.blocklyDiv = document.getElementById('blocklyDiv');
      this.workspace = Blockly.inject('blocklyDiv', toolbox);
      // change listener on workspace update event
      this.workspace.addChangeListener(() => {
        this.code = Blockly.Python.workspaceToCode(this.workspace);
      });
  }

}
