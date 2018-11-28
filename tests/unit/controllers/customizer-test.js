import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | customizer", function(hooks) {
  setupTest(hooks);

  // Test options change (color, size)
  test("Options are changed", function(assert) {
    let controller = this.owner.lookup("controller:customizer");

    controller.send("optionChange", "color", "blue");
    assert.equal(controller.color, "blue", "Triggering optionChange action with [color, blue] would result in change of color variable from #f00 to blue");

    controller.send("optionChange", "size", "S");
    assert.equal(controller.size, "S", "Triggering optionChange action with [size, S] would result in change of size variable from M to S");
  });

  // Open/Close overlay
  test("Overlay open and close", function(assert) {
    let controller = this.owner.lookup("controller:customizer");

    controller.send("save");
    assert.ok(controller.overlayDisplayed, "Triggering save action should change overlayDisplayed variable from false to true");

    controller.send("closeOverlay");
    assert.notOk(controller.overlayDisplayed, "Triggering closeOverlay action should change overlayDisplayed variable from true to false");
  });

  // Save svg
  test("Drawingboard svg save", function(assert) {
    let controller = this.owner.lookup("controller:customizer"),
        svg = ["test"];

    controller.send("saveDrawingboardSvg", svg);
    assert.equal(controller.svg, svg[0], "Triggering saveDrawingboardSvg action should set svg variable to the provided parameter");
  });

  // Save svg converted image
  test("Converted svg image save", function(assert) {
    let controller = this.owner.lookup("controller:customizer"),
        img = "test";

    controller.send("svgConverted", img);
    assert.equal(controller.imageUrl, img, "Triggering svgConverted action should set imageUrl variable to the provided parameter");
  });
});
