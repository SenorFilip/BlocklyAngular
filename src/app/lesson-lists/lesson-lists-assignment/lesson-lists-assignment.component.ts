import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomBlock, NgxBlocklyComponent, NgxBlocklyConfig, NgxBlocklyGeneratorConfig, NgxToolboxBuilderService} from 'ngx-blockly';
import * as Blockly from 'ngx-blockly/scripts/blockly/typings/blockly';
import { MoveDownBlock, MoveRightBlock, MoveUpBlock} from '../../lesson-for-loop/lesson-for-loop/custom.blocks';
import {Application} from 'pixi.js';

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
  @ViewChild(NgxBlocklyComponent) workspace;
  code: string;
  // workspaceBlocks: Blockly.Block[] = [];

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
    new MoveUpBlock('moveUp', null, null),
    new MoveDownBlock('moveDown', null, null),
    new MoveRightBlock('moveRight', null, null)
  ];

  constructor(private ngxToolboxBuilderService: NgxToolboxBuilderService) {
    this.ngxToolboxBuilderService.nodes = this.customBlocks;
    this.config.toolbox = this.ngxToolboxBuilderService.build();
  }

  ngOnInit(): void {
    this.canvas = document.getElementById('pixiJsListsCanvas');
    // const rendererWidth = this.canvas.offsetWidth;
    // const rendererHeight = this.canvas.offsetHeight;

    this.pixiApp = new Application({
      view: this.canvas,
      backgroundColor: 0x66aa77,
      resizeTo: this.canvas,
    });
  }

  onCode(code: string) {
    console.log(code);
  }

}
