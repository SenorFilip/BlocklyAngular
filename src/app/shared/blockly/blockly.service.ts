import {Injectable} from '@angular/core';
import {NgxToolboxBuilderService} from 'ngx-blockly';
import {ForLoopBlock, MoveDownBlock, MoveLeftBlock, MoveRightBlock, MoveUpBlock} from '../../lesson-for-loop/lesson-for-loop/custom.blocks';

@Injectable({
  providedIn: 'root'
})
export class BlocklyService {

  private ngxToolboxBuilder;

  constructor(ngxToolboxBuilder: NgxToolboxBuilderService) {
    ngxToolboxBuilder.nodes = [
      new ForLoopBlock('myCustomLoop', null, null),
      new MoveUpBlock('moveUp', null, null),
      new MoveDownBlock('moveDown', null, null),
      new MoveLeftBlock('moveLeft', null, null),
      new MoveRightBlock('moveRight', null, null)
    ];
    this.ngxToolboxBuilder = ngxToolboxBuilder.build();
  }

  getNgxToolboxBuilder() {
    return this.ngxToolboxBuilder;
  }

}
