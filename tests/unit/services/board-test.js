import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | board", function(hooks) {
  setupTest(hooks);

  function getFakeIcon(parentIndex, currentIndex) {
    return {
      currentIndex: currentIndex,
      parentId: parentIndex,
      position: {
        x: 0,
        y: 0
      },
      icon: ""
    };
  }

  test("Icons array initialized", function(assert) {
    let service = this.owner.lookup("service:board");
    service.initBoard();

    assert.deepEqual(service.icons, [], "Icons property is an empty array");
  });

  test("Add icon", function(assert) {
    let service = this.owner.lookup("service:board");
    service.initBoard();

    service.addIcon(getFakeIcon(0));
    assert.equal(service.icons.length, 1, "After we add one icon to parent 0 we should have only on parent");

    service.addIcon(getFakeIcon(1));
    assert.equal(service.icons.length, 2, "After we add one icon to parent 1 we should have two parents");

    service.addIcon(getFakeIcon(1));
    assert.equal(service.icons.length, 2, "After we add another icon to parent 1 we should have two parents");

    assert.equal(service.icons[0].length, 1, "First parent should have only one icon");
    assert.equal(service.icons[0].length, 1, "First parent should have only one icon");
    assert.equal(service.icons[1].length, 2, "Second parent should have two icon");
  });

  test("Delete icon", function(assert) {
    let service = this.owner.lookup("service:board");
    service.initBoard();

    service.addIcon(getFakeIcon(0));
    service.addIcon(getFakeIcon(0));
    service.addIcon(getFakeIcon(0));
    service.addIcon(getFakeIcon(0));

    service.removeIcon(getFakeIcon(0, 1));

    assert.equal(service.icons[0].length, 3, "Icon was removed");
    assert.equal(service.icons[0][1].currentIndex, 1, "First sibling after deleted icon updated");
    assert.equal(service.icons[0][2].currentIndex, 2, "Second sibling after deleted icon updated");
  });
});
