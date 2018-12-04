import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | icons", function(hooks) {
  setupTest(hooks);

  const mockIcons = {
    alien: "alienIcon.jpg"
  };

  test("Icons array update", function(assert) {
    let service = this.owner.lookup("service:icons");

    service.updateIcons(mockIcons);

    assert.deepEqual(service.icons, mockIcons, "The service icons property should be the same with the provided one");
  });

  test("Icon get", function(assert) {
    let service = this.owner.lookup("service:icons");
    service.updateIcons(mockIcons);

    let resultIcon = service.get("alien");

    assert.equal(resultIcon, mockIcons["alien"], "The requested icon is the same with the one from provided object");
  });
});
