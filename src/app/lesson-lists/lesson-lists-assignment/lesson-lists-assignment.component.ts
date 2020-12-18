import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig } from 'ngx-blockly';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from '../../lesson-for-loop/lesson-for-loop/custom.blocks';
import {Application} from 'pixi.js';
import {BlocklyService} from '../../shared/blockly/blockly.service';

@Component({
  selector: 'app-lesson-lists-assignment',
  templateUrl: './lesson-lists-assignment.component.html',
  styleUrls: ['./lesson-lists-assignment.component.scss']
})
export class LessonListsAssignmentComponent implements OnInit {

  // PixiJS variables
  canvas;
  pixiApp: Application;

  // Blockly variables
  @ViewChild(NgxBlocklyComponent) workspace1;
  code: string;
  workspaceBlocks: Blockly.Block[] = [];

  public config1: NgxBlocklyConfig = {
    scrollbars: true,
    trashcan: true
  };

  public generatorConfig1: NgxBlocklyGeneratorConfig = {
    dart: true,
    javascript: true,
    lua: true,
    php: true,
    python: true,
    xml: true
  };

  public customBlocks1: CustomBlock[] = [
    new ForLoopBlock('myCustomLoop', null, null),
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveLeftBlock('moveLeft', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(
    private blocklyService: BlocklyService
) {
    // ngxToolboxBuilder.nodes = [
    //   new ForLoopBlock('myCustomLoop', null, null),
    //   new MoveUpBlock('moveUp', null, null),
    //   new MoveDownBlock('moveDown', null, null),
    //   new MoveLeftBlock('moveLeft', null, null),
    //   new MoveRightBlock('moveRight', null, null)
    // ];
    // setTimeout(() => {
    //   this.config1.toolbox = ngxToolboxBuilder.build();
    // }, 1000);
    this.config1.toolbox = this.blocklyService.getNgxToolboxBuilder();
  }

  ngOnInit(): void {
    // this.workspace1.workspace.render();
    this.canvas = document.getElementById('pixiJsListsCanvas');
    const rendererWidth = this.canvas.offsetWidth;
    const rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      backgroundColor: 0x66aa77,
      resizeTo: this.canvas,
    });

    // setTimeout(() => {
    //   // this.config1.toolbox = ngxToolboxBuilder.build();
    //   this.workspace1.workspace.render();
    // }, 1000);
  }

  // ngOnDestroy() {
  //   this.ngxToolboxBuilder.nodes = undefined;
  // }

  onCode(code: string) {
    console.log(code);
  }
}
