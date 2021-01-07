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

export class MyMovesFunctionBlock extends CustomBlock {
    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = MyMovesFunctionBlock;
    }

    defineBlock() {
        this.block.appendDummyInput()
            .appendField('MY MOVES function');
        this.block.setPreviousStatement(true, null);
        this.block.setNextStatement(true, null);
        this.block.setColour(0);
        this.block.setTooltip('');
        this.block.setHelpUrl('');
    }

    toPythonCode(block: MyMovesFunctionBlock): string | any[] {
        return 'MyMovesFunctionBlock';
    }
}

export class MyMovesFunctionBodyBlock extends CustomBlock {
    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = MyMovesFunctionBodyBlock;
    }

    defineBlock() {
        this.block.appendDummyInput()
            .appendField('MY MOVES function definition');
        this.block.appendStatementInput('functionContent')
            .setCheck(null);
        this.block.setColour(135);
        this.block.setTooltip('');
        this.block.setHelpUrl('');
    }

    toPythonCode(block: MyMovesFunctionBodyBlock): string | any[] {
        return 'MyMovesFunctionBodyBlock';
    }
}

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

export class VehicleBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = VehicleBlock;
    }

    defineBlock() {
        this.block.appendDummyInput()
            .appendField('VEHICLE');
        this.block.appendDummyInput()
            .appendField('  Type:    ')
            .appendField(new Blockly.FieldDropdown([
                ['Car', 'car'],
                ['Van', 'van'],
                ['Truck', 'Truck']
            ]), 'type');
        this.block.appendDummyInput()
            .appendField('  Color:   ')
            .appendField(new Blockly.FieldDropdown([
                [{src: 'assets/images/blockly/red.jpg', width: 40, height: 20, alt: '*'}, 'red'],
                [{src: 'assets/images/blockly/blue.png', width: 40, height: 20, alt: '*'}, 'blue'],
                [{src: 'assets/images/blockly/blue.png', width: 40, height: 20, alt: '*'}, 'blue'],
                [{src: 'assets/images/blockly/blue.png', width: 40, height: 20, alt: '*'}, 'blue'],
                [{src: 'assets/images/blockly/blue.png', width: 40, height: 20, alt: '*'}, 'blue'],
                [{src: 'assets/images/blockly/green.jpg', width: 40, height: 20, alt: '*'}, 'green']
                ]), 'color')
          // added for right padding on the block
          .appendField('    ');
        this.block.appendDummyInput()
            .appendField('  Wheels:')
            .appendField(new Blockly.FieldDropdown([
                ['Bronze', 'bronze'],
                ['Platinum', 'platinum'],
                ['Gold', 'gold']
            ]), 'wheels');
        this.block.setColour(345);
        this.block.setTooltip('');
        this.block.setHelpUrl('');
    }

    toPythonCode(block: VehicleBlock): string | any[] {
        return 'Vehicle [type: ' + this.block.getFieldValue('type') + ', color: ' + this.block.getFieldValue('color') + ', wheels: ' +
          this.block.getFieldValue('wheels') + ']';
    }
}

export class CoatBlock extends CustomBlock {

    constructor(type: string, block: any, blockMutator: BlockMutator, ...args: any[]) {
        super(type, block, blockMutator, ...args);
        this.class = CoatBlock;
    }

    defineBlock() {
        this.block.appendDummyInput()
            .appendField('Get coat with number: ')
            .appendField(new Blockly.FieldNumber(0), 'coatNumber');
        this.block.setColour(345);
        this.block.setTooltip('');
        this.block.setHelpUrl('');
    }

    toPythonCode(block: VehicleBlock): string | any[] {
        return 'Coat[' + this.block.getFieldValue('coatNumber') + ']';
    }
}


