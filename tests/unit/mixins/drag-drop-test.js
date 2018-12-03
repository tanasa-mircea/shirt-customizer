import EmberObject from "@ember/object";
import DragDropMixin from "shirt-customizer/mixins/drag-drop";
import { module, test } from "qunit";

module("Unit | Mixin | drag-drop", function() {
  // Replace this with your real tests.
  test("Handler Override", async function (assert) {
    let DragDropObject = EmberObject.extend(DragDropMixin);
    let subject = DragDropObject.create();

    assert.throws(subject.mouseDown.bind(subject), /Mouse down override should be overwritten by the extending class/, "Should throw error if mouseDownOverride was not overriden");
    assert.ok(subject.isMouseDown, "isMouseDown variable is set to true after mouseDown call");
    assert.throws(subject.mouseMoveHandler.bind(subject), /Mouse move override should be overwritten by the extending class/, "Should throw error if mouseMoveOverride was not overriden");
    assert.throws(subject.mouseUpHandler.bind(subject), /Mouse up override should be overwritten by the extending class/, "Should throw error if mouseUpOverride was not overriden");
    assert.notOk(subject.isMouseDown, "isMouseDown variable is set to false after mouseUp call");
  });
});
