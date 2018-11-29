import Application from "@ember/application";

import { initialize } from "shirt-customizer/instance-initializers/pre-data";
import { module, test } from "qunit";
import { run } from "@ember/runloop";

const expected = {

};
var application,
    appInstance;

var iconsService;

module("Unit | Instance Initializer | pre-data", function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      application = Application.create();

      application.deferReadiness();
      appInstance = application.buildInstance();
      appInstance.set("application.preloadedIcons", expected);
      application.advanceReadiness();
      console.log('inside run' );
    });
  });

  // Replace this with your real tests.
  test("it works", async function(assert) {
    initialize(appInstance);
    console.log('inside test');
    const iconsService = appInstance.lookup("service:icons");
    const serviceIcons = iconsService.icons;

    assert.deepEqual(serviceIcons, expected, "Icons set on application are the same with the ones saved");
  });
});
