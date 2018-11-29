import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

function createFakeElement() {
  const fakeTarget = document.createElement("div");
  fakeTarget.style.height = "100px";
  fakeTarget.style.width = "100px";
  fakeTarget.style.position = "absolute";
  fakeTarget.style.top = 0;
  fakeTarget.style.left = 0;

  return fakeTarget;
}

module("Unit | Service | tooltip", function(hooks) {
  setupTest(hooks);

  // test show
  test("Show tooltip without positions", function(assert) {
    const service = this.owner.lookup("service:tooltip");
    const tooltipFactory = this.owner.factoryFor("component:tool-tip");
    const component = tooltipFactory.create();
    const options = {
      target: createFakeElement()
    };

    service.setCurrentTooltip(component);

    service.show(options);
    assert.ok(service.currentTooltip.visible, "Current tooltip's visible is set to true when service' show method is called");
    assert.deepEqual(service.currentTooltip.options.positions, service.defaultPositions, "If 'positions' is missing from provided options the default ones will be copied");
  });

  test("Show tooltip with positions", function(assert) {
    const service = this.owner.lookup("service:tooltip");
    const tooltipFactory = this.owner.factoryFor("component:tool-tip");
    const component = tooltipFactory.create();
    const options = {
      target: createFakeElement(),
      positions: [{
        position: "top",
        offset: 40
      }, {
        position: "left",
        offset: "20"
      }]
    };

    service.setCurrentTooltip(component);

    service.show(options);
    assert.ok(service.currentTooltip.visible, "Current tooltip's visible is set to true when service' show method is called");
    assert.notDeepEqual(service.currentTooltip.options.positions, service.defaultPositions, "If 'positions' is provided in options this is what will be passed to component");
  });

  test("Hide tooltip", function(assert) {
    const service = this.owner.lookup("service:tooltip");
    const tooltipFactory = this.owner.factoryFor("component:tool-tip");
    const component = tooltipFactory.create();
    const options = {
      target: createFakeElement()
    };

    service.setCurrentTooltip(component);

    service.hide(options);
    assert.notOk(service.currentTooltip.visible, "Current tooltip's visible is set to false when service' hide method is called");
  });

  test("Set tooltip", function(assert) {
    const service = this.owner.lookup("service:tooltip");
    const tooltipFactory = this.owner.factoryFor("component:tool-tip");
    const component = tooltipFactory.create();
    service.setCurrentTooltip(component);

    assert.deepEqual(service.currentTooltip, component, "The component stored in the service is the same as the provided one");
  });
});
