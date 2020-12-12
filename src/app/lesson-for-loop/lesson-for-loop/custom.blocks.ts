import {BlockMutator, BlockStyles, CategoryStyles, ComponentStyle, CustomBlock, Theme} from 'ngx-blockly';

declare var Blockly: any;

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
      .appendField(new Blockly.FieldImage('assets/images/blockly/loop_icon.png', 20, 20, '*'));
    // .appendField(new Blockly.FieldImage(this.args[0], 50, 50, '*'));
    this.block.appendStatementInput('loopContent')
      .setCheck(null);
    this.block.setPreviousStatement(true, 'myCustomLoop');
    this.block.setNextStatement(true, 'myCustomLoop');
    this.block.setColour(330);
    this.block.setTooltip('For ');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: CustomBlock): string | any[] {
    const numberOfLoops = this.block.getFieldValue('numberOfLoops');
    let statement = Blockly.Python.statementToCode(block, 'loopContent');
    if (statement.length === 0) {
      statement = 'pass';
    }
    return 'for count in range(' + numberOfLoops + '):' + statement;
  }
}

export class MoveUpBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MoveUpBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Move up')
      .appendField(new Blockly.FieldImage('assets/images/blockly/arrow_up.png', 20, 20, '*'));
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: MoveUpBlock): string | any[] {
    return 'moveUp();';
  }
}

export class MoveDownBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MoveDownBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Move down')
      .appendField(new Blockly.FieldImage('assets/images/blockly/arrow_down.png', 20, 20, '*'));
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: MoveDownBlock): string | any[] {
    return 'moveDown();';
  }
}

export class MoveLeftBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MoveLeftBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Move left')
      .appendField(new Blockly.FieldImage('assets/images/blockly/arrow_left.png', 20, 20, '*'));
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: MoveLeftBlock): string | any[] {
    return 'moveLeft();';
  }
}

export class MoveRightBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MoveRightBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Move right')
      .appendField(new Blockly.FieldImage('assets/images/blockly/arrow_right.png', 20, 20, '*'));
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: MoveRightBlock): string | any[] {
    return 'moveRight();';
  }
}
