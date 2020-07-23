import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from './custom.blocks';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';

@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.scss']
})
export class BlocklyComponent implements OnInit {

  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  workspaceBlocks: Blockly.Block[] = [];

  public config: NgxBlocklyConfig = {
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

  public customBlocks: CustomBlock[] = [
    new ForLoopBlock('myCustomLoop', null, null),
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveLeftBlock('moveLeft', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new ForLoopBlock('myCustomLoop', null, null),
      new MoveUpBlock('moveUp', null, null),
      new MoveDownBlock('moveDown', null, null),
      new MoveLeftBlock('moveLeft', null, null),
      new MoveRightBlock('moveRight', null, null)
    ];
    this.config.toolbox = ngxToolboxBuilder.build();
  }

  ngOnInit() {}

  runRabbit() {
    this.workspaceBlocks = [];
    const topBlocks = this.workspace.workspace.getTopBlocks(true);
    topBlocks.forEach(block => {
      let currentBlock = block;
      while (currentBlock !== null ) {
        if (currentBlock.type === 'myCustomLoop') {
          this.unwrapLoopBlock(currentBlock);
        } else {
          this.workspaceBlocks.push(currentBlock);
        }
        currentBlock = currentBlock.getNextBlock();
      }
    });

    console.log('\n----sadrzaj');
    this.workspaceBlocks.forEach(b => {
      console.log(b.type);
    });
  }

  onCode(code: string) {
    this.code = code;
  }

  unwrapLoopBlock(loopBlock: Blockly.Block) {
    const numberOfLoops = loopBlock.getFieldValue('numberOfLoops');
    for (let i = numberOfLoops; i > 0; i--) {
      // getChildren() return only first child because of reasons
      const loopContent = loopBlock.getChildren(true);
      if (loopContent.length !== 0) {
        let currentBlock = loopContent[0];
        while (currentBlock !== null ) {
          if (currentBlock.type === 'myCustomLoop') {
            this.unwrapLoopBlock(currentBlock);
          } else {
            this.workspaceBlocks.push(currentBlock);
          }
          currentBlock = currentBlock.getNextBlock();
        }
      }
    }
  }

}
