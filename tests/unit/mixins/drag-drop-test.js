import EmberObject from "@ember/object";
import DragDropMixin from "shirt-customizer/mixins/drag-drop";
import { module, test } from "qunit";

module("Unit | Mixin | drag-drop", function() {
  // Replace this with your real tests.
  test("it works", function (assert) {
    let DragDropObject = EmberObject.extend(DragDropMixin);
    let subject = DragDropObject.create();
    assert.ok(subject);
  });
});
