import {BlockMutator, CustomBlock} from 'ngx-blockly';
declare var Blockly: any;

export class IfBlock extends CustomBlock {
  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = IfBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('IF Mario is standing on')
      .appendField(new Blockly.FieldDropdown([
        [{src: 'assets/images/blockly/red.jpg', width: 40, height: 20, alt: '*'}, 'red'],
        [{src: 'assets/images/blockly/blue.png', width: 40, height: 20, alt: '*'}, 'blue'],
        [{src: 'assets/images/blockly/green.jpg', width: 40, height: 20, alt: '*'}, 'green']
      ]), 'color');
    this.block.appendDummyInput()
      .appendField(' then')
      .appendField(new Blockly.FieldDropdown([
        ['move  RIGHT', 'moveRight'],
        ['move  DOWN', 'moveDown']
      ]), 'movement');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: IfBlock): string | any[] {
    // const ifContent = Blockly.Python.statementToCode(block, 'ifContent');
    return 'if (color == ' + this.block.getFieldValue('color');
  }
}







