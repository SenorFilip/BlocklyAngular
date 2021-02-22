import {NgxBlocklyConfig} from 'ngx-blockly';

export const toolbox: NgxBlocklyConfig = {
    toolbox: `
<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" style="display: none">
  <category name="Blocks">
    <block type="for_loop">
      <field name="numberOfLoops">1</field>
    </block>
  </category>
</xml>
<!--    <xml id="toolbox" style="display: none">-->
<!--      <category name="Control" colour="120">-->
<!--        <block type="controls_if" disabled="true"></block>-->
<!--        <block type="controls_whileUntil"></block>-->
<!--        <block type="controls_repeat_ext" disabled="true"></block>-->
<!--      </category>-->
<!--      <category name="Text" colour="230">-->
<!--        <block type="text"></block>-->
<!--        <block type="text_print"></block>-->
<!--      </category>-->
<!--      <category name="Core">-->
<!--        <category name="Control">-->
<!--          <block type="controls_if"></block>-->
<!--          <block type="controls_whileUntil"></block>-->
<!--        </category>-->
<!--        <category name="Logic">-->
<!--          <block type="logic_compare"></block>-->
<!--          <block type="logic_operation"></block>-->
<!--          <block type="logic_boolean"></block>-->
<!--        </category>-->
<!--      </category>-->
<!--      <sep></sep>-->
<!--      <category name="Custom">-->
<!--        <block type="logic_boolean"></block>-->
<!--        <block type="math_number">-->
<!--          <field name="NUM">42</field>-->
<!--        </block>-->
<!--        <block type="controls_for">-->
<!--          <value name="FROM">-->
<!--            <block type="math_number">-->
<!--              <field name="NUM">1</field>-->
<!--            </block>-->
<!--          </value>-->
<!--          <value name="TO">-->
<!--            <block type="math_number">-->
<!--              <field name="NUM">10</field>-->
<!--            </block>-->
<!--          </value>-->
<!--          <value name="BY">-->
<!--            <block type="math_number">-->
<!--              <field name="NUM">1</field>-->
<!--            </block>-->
<!--          </value>-->
<!--        </block>-->
<!--        <block type="math_arithmetic">-->
<!--          <field name="OP">ADD</field>-->
<!--          <value name="A">-->
<!--            <shadow type="math_number">-->
<!--              <field name="NUM">1</field>-->
<!--            </shadow>-->
<!--          </value>-->
<!--          <value name="B">-->
<!--            <shadow type="math_number">-->
<!--              <field name="NUM">1</field>-->
<!--            </shadow>-->
<!--          </value>-->
<!--        </block>-->
<!--      </category>-->
<!--      <category name="Test" colour="44">-->
<!--        <block type="logic_operation"></block>-->
<!--        <label text="A label" web-class="myLabelStyle"></label>-->
<!--        <label text="Another label"></label>-->
<!--        <block type="logic_negate"></block>-->
<!--        <button text="A button" callbackKey="myFirstButtonPressed"></button>-->
<!--        <block type="logic_boolean"></block>-->
<!--      </category>-->
<!--    </xml>-->
`,
    grid: {
        spacing: 20,
        length: 3,
        colour: '#167729',
        snap: true},
    zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2},
    // move: {
    //     scrollbars: true,
    //     drag: true,
    //     wheel: false},
    trashcan: true,
    scrollbars: false
};
