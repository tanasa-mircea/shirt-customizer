import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Route | customizer", function(hooks) {
  setupTest(hooks);

  test("it exists", function(assert) {
    var route = this.owner.lookup("route:customizer");
    assert.ok(route);
  });

  test("model", function(assert) {
    var done = assert.async();
    var route = this.owner.lookup("route:customizer");
    var results = [];
    var modelCallback = function() {
      assert.ok(results.length === 2, "The results contains two sets");
      assert.ok(results[0] && Object.keys(results[0]).length > 0, "The shirts results contains at least one svg");
      assert.ok(results[1] && results[1].options && results[1].options.length > 0, "The config results contains at least one option");

      done();
    };

    route.model()
      .then(function(res) {
        results = res;
        modelCallback();
      })
      .catch(function() {
        modelCallback();
      });
  });
});