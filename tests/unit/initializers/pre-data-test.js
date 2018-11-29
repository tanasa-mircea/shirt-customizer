import Application from "@ember/application";

import { initialize } from "shirt-customizer/initializers/pre-data";
import { module, test } from "qunit";
import { setupTest } from "ember-qunit";
import { run } from "@ember/runloop";

var application;

module("Unit | Initializer | pre-data", function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();
    });
  });

  test("Preloaded Icons validity", async function(assert) {
    await initialize(application);

    const isObject = (typeof application.preloadedIcons) === "object";
    const hasProperties = isObject && Object.keys(application.preloadedIcons).length > 0;

    assert.ok(isObject, "The initialized preloadedIcons should be an object");
    assert.ok(hasProperties, "The initialized preloadedIcons should have at least one property inside");
  });
});
