import { gallerycond } from "shirt-customizer/helpers/gallerycond";
import { module, test } from "qunit";

module("Unit | Helper | eq", function() {
  test("determine if an item should be visible on current gallery page", function(assert) {
    const itemsOnPage = 8;
    const firstItemIndex = 0;
    const tenthItemIndex = 10;

    let currentPage = 1;

    let shouldDisplayFirstItem = gallerycond([firstItemIndex, currentPage, itemsOnPage]);
    let shouldDisplayTenthItem = gallerycond([tenthItemIndex, currentPage, itemsOnPage]);

    assert.ok(shouldDisplayFirstItem, "On page 1 the first item should be displayed");
    assert.notOk(shouldDisplayTenthItem, "On page 1 the tenth item shouldn't be displayed");

    currentPage++;

    shouldDisplayFirstItem = gallerycond([firstItemIndex, currentPage, itemsOnPage]);
    shouldDisplayTenthItem = gallerycond([tenthItemIndex, currentPage, itemsOnPage]);

    assert.notOk(shouldDisplayFirstItem, "On page 2 the first item shouldn't be displayed");
    assert.ok(shouldDisplayTenthItem, "On page 2 the tenth item should be displayed");
  });
});
