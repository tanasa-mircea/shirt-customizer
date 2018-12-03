import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Component | Tooltip", function(hooks) {
  setupTest(hooks);

  const defaultTooltipDimensions = {
    height: 100,
    width: 100
  };

  const parentRectangles = [{
    x: 15,
    y: 15,
    height: 875,
    width: 875
  }, {
    x: 15,
    y: 15,
    height: 200,
    width: 875
  }];

  const targetRectangles = [{
    x: 300,
    y: 300,
    width: 200,
    height: 100
  }, {
    x: 20,
    y: 20,
    width: 200,
    height: 100
  }, {
    x: 800 ,
    y: 20,
    width: 200,
    height: 100
  }];

  const positions = [{
    position: "top",
    offset: 10
  }, {
    position: "right",
    offset: 10
  }, {
    position: "bottom",
    offset: 10
  }, {
    position: "left",
    offset: 10
  }];

  test("Tooltip visibility", function(assert) {
    assert.expect(2);
    const mockTarget = targetRectangles[0];
    const mockParent = parentRectangles[0];

    let options = {
      positions: positions,
      target: mockTarget,
      parent: mockParent
    };

    var component = this.owner.factoryFor("component:tool-tip").create();
    component.show(options);
    assert.ok(component.visible, "After calling show, the tooltip is visible");

    component.hide();
    assert.notOk(component.visible, "After calling hide, the tooltip is invisible");
  });

  test("Tooltip top and should be top", function(assert) {
    assert.expect(1);
    const mockTarget = targetRectangles[0];
    const mockParent = parentRectangles[0];

    let component = this.owner.factoryFor("component:tool-tip").create();
    let options = {
      positions: positions,
      target: mockTarget,
      parent: mockParent
    };

    component.show(options);

    const computedX = mockTarget.x - (mockTarget.width / 2);
    const computedY = mockTarget.y - defaultTooltipDimensions.height - positions[0].offset;
    assert.deepEqual(component.position, [computedX, computedY], "Tooltip should be placed on top");
  });

  test("Tooltip top and should be right", function(assert) {
    assert.expect(1);
    const mockTarget = targetRectangles[1];
    const mockParent = parentRectangles[0];

    let component = this.owner.factoryFor("component:tool-tip").create();
    let options = {
      positions: positions,
      target: mockTarget,
      parent: mockParent
    };

    component.show(options);

    const computedX =  mockTarget.x + mockTarget.width + positions[1].offset;
    const computedY = mockTarget.y - mockTarget.height / 2;
    assert.deepEqual(component.position, [computedX, computedY], "Tooltip should be placed on right");
  });

  test("Tooltip top and should be bottom", function(assert) {
    assert.expect(1);
    const mockTarget = targetRectangles[2];
    const mockParent = parentRectangles[0];

    let component = this.owner.factoryFor("component:tool-tip").create();
    let options = {
      positions: positions,
      target: mockTarget,
      parent: mockParent
    };

    component.show(options);

    const computedX =  mockTarget.x - mockTarget.width / 2;
    const computedY = mockTarget.y + mockTarget.height + positions[2].offset;
    assert.deepEqual(component.position, [computedX, computedY], "Tooltip should be placed on bottom");
  });

  test("Tooltip top and should be left", function(assert) {
    assert.expect(1);
    const mockTarget = targetRectangles[2];
    const mockParent = parentRectangles[1];

    let component = this.owner.factoryFor("component:tool-tip").create();
    let options = {
      positions: positions,
      target: mockTarget,
      parent: mockParent
    };

    component.show(options);

    const computedX =  mockTarget.x - defaultTooltipDimensions.width - positions[2].offset;
    const computedY = mockTarget.y - mockTarget.height / 2;
    assert.deepEqual(component.position, [computedX, computedY], "Tooltip should be placed on left");
  });
});
