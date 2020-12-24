import {BlockMutator, CustomBlock} from 'ngx-blockly';

declare var Blockly: any;

export class ListBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = ListBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Create list')
      .appendField(new Blockly.FieldImage('assets/images/blockly/list_icon.png', 50, 50, '*'));
    this.block.appendStatementInput('listContent')
      .setCheck(null);
    this.block.setColour(300);
    this.block.setTooltip('List');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: ListBlock): string | any[] {
    const listContent = Blockly.Python.statementToCode(block, 'listContent');
    return 'List[' + listContent + ']';
  }
}

export class GandalfBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = GandalfBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Gandalf');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(75);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: GandalfBlock): string | any[] {
    return 'Gandalf, ';
  }
}

export class HarryPotterBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = HarryPotterBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Harry Potter');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(210);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: HarryPotterBlock): string | any[] {
    return 'Harry Potter, ';
  }
}

export class JohnSnowBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = JohnSnowBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('John Snow');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(230);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: JohnSnowBlock): string | any[] {
    return 'John Snow, ';
  }
}

export class SuperMarioBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = SuperMarioBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Super Mario');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(330);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: SuperMarioBlock): string | any[] {
    return 'Super Mario, ';
  }
}

export class CaptainMarvelBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = CaptainMarvelBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Captain Marvel');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(20);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: CaptainMarvelBlock): string | any[] {
    return 'Captain Marvel, ';
  }
}

export class MegaManBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = MegaManBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Mega Man');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(210);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: MegaManBlock): string | any[] {
    return 'Mega Man, ';
  }
}

export class WonderWomanBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = WonderWomanBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Wonder Woman');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(65);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: WonderWomanBlock): string | any[] {
    return 'Wonder Woman, ';
  }
}

export class YodaBlock extends CustomBlock {

  constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
    super(type, block, blockMutator, ...args);
    this.class = YodaBlock;
  }

  defineBlock() {
    this.block.appendDummyInput()
      .appendField('Yoda');
    this.block.setPreviousStatement(true, null);
    this.block.setNextStatement(true, null);
    this.block.setColour(120);
    this.block.setTooltip('');
    this.block.setHelpUrl('');
  }

  toPythonCode(block: YodaBlock): string | any[] {
    return 'Yoda, ';
  }
}


