import {Component, OnInit} from '@angular/core';
import {CustomBlock, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from './test.block';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {

  code: string;
  // workspace: any;
  // public config: NgxBlocklyConfig = toolbox;

  public config: NgxBlocklyConfig = {
    toolbox: `
      <xml id="toolbox" style="display: none">
      <block type="controls_if"></block>
      <block type="controls_repeat_ext"></block>
      <block type="logic_compare"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
      <block type="text"></block>
      <block type="text_print"></block>
      </xml>
    `,
    scrollbars: true,
    trashcan: true
  };

  public generatorConfig: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  // blocklyDiv: HTMLElement;

  public customBlocks: CustomBlock[] = [
    new ForLoopBlock('myCustomLoop', null, null),
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveLeftBlock('moveLeft', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      // new Category('Test', '#FF00FF', this.customBlocks, null),
      new ForLoopBlock('myCustomLoop', null, null),
      new MoveUpBlock('moveUp', null, null),
      new MoveDownBlock('moveDown', null, null),
      new MoveLeftBlock('moveLeft', null, null),
      new MoveRightBlock('moveRight', null, null)
      // LOGIC_CATEGORY,
      // LOOP_CATEGORY,
      // MATH_CATEGORY,
      // TEXT_CATEGORY,
      // new Separator(), // Add Separator
      // LISTS_CATEGORY,
      // COLOUR_CATEGORY,
      // VARIABLES_CATEGORY,
      // FUNCTIONS_CATEGORY
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
    // this.config.theme = exampleTheme.createBlocklyTheme();
  }

  ngOnInit() {
    // this.blocklyDiv = document.getElementById('blocklyDiv');
    // this.workspace = Blockly.inject('blocklyDiv', toolbox);
    // change listener on workspace update event
    // this.workspace.addChangeListener(() => {
    //   this.code = Blockly.Python.workspaceToCode(this.workspace);
    // });
  }

  runCode() {
    // window.LoopTrap = 1000;
    // Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if (--window.LoopTrap == 0) throw "Infinite loop.";\n';

  }

  onCode(code: string) {
    this.code = code;
  }

}
