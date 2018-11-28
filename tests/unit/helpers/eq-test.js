import { eq } from "shirt-customizer/helpers/eq";

import { module, test } from "qunit";

module("Unit | Helper | eq", function() {
  test("check equality", function(assert) {
    var equalityResult = eq([2, 2]);
    assert.ok(equalityResult, "2 should be equal to 2");

    var inequalityResult = eq([2, 3]);
    assert.notOk(inequalityResult, "2 shouldn't be equal to 3");
  });
});
