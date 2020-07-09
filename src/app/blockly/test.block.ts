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

  onChange(changeEvent: any) {
    console.log(changeEvent);
  }

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
