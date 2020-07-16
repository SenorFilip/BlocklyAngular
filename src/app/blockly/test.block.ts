import {BlockMutator, BlockStyles, CategoryStyles, ComponentStyle, CustomBlock, Theme} from 'ngx-blockly';

declare var Blockly: any;

export class TestBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = TestBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField(this.type)
      .appendField(new Blockly.FieldImage('assets/carrot.png', 50, 50, '*'));
      // .appendField(new Blockly.FieldImage(this.args[0], 50, 50, '*'));
    this.block.setOutput(true, 'Input');
    this.block.setColour(30);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toXML() {
    return '<block type="test"></block>';
  }

  toDartCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toJavaScriptCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toLuaCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPHPCode(block: CustomBlock): string | any[] {
    return 'Not implemented';
  }

  toPythonCode(block: CustomBlock): string | any[] {
    return 'Mrkva';
  }

  // onChange(changeEvent: any) {
  //   console.log(changeEvent);
  // }

}

export const blockStyles: BlockStyles = {
  logic_blocks: {
    colourPrimary: '310',
  },
};

export const categoryStyles: CategoryStyles = {
  logic_category: {
    colour: '110',
  },
};

export const componentStyle: ComponentStyle = {
  workspaceBackgroundColour: '#ff0000',
  toolboxBackgroundColour: '#00ff00',
  scrollbarColour: '#ff337a',
  insertionMarkerColour: '#FF0000',
  flyoutBackgroundColour: '#aaa000',
  flyoutOpacity: 1
// # See docs fore more options
};

export const exampleTheme: Theme = new Theme (
  'ThemeName',
  blockStyles,
  categoryStyles,
  componentStyle
);

export class ForLoopBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = ForLoopBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Repeat')
      .appendField(new Blockly.FieldNumber(0, 1), 'numberOfLoops')
      .appendField('time/s')
      .appendField(new Blockly.FieldImage('assets/loop_icon.png', 20, 20, '*'));
    // .appendField(new Blockly.FieldImage(this.args[0], 50, 50, '*'));
    this.block.appendStatementInput('NAME')
      .setCheck(['moveLeft', 'moveRight', 'moveUp', 'moveDown']);
    this.block.setPreviousStatement(true, 'myCustomLoop');
    this.block.setNextStatement(true, 'myCustomLoop');
    this.block.setColour(330);
    this.block.setTooltip('For ');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: CustomBlock): string | any[] {
    const numberOfLoops = this.block.getFieldValue('numberOfLoops');
    let statement = Blockly.Python.statementToCode(block, 'NAME');
    if (statement.length === 0) {
      statement = 'pass';
    }
    return 'for count in range(' + numberOfLoops + '):' + statement;
  }
}
