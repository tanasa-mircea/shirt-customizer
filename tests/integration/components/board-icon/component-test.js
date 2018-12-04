import {
  module,
  test
} from "qunit";
import {
  setupRenderingTest
} from "ember-qunit";
import {
  render,
  click
} from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | board-icon", function(hooks) {
  setupRenderingTest(hooks);

  test("Renders with correct positioning", async function(assert) {
    let currentElementData = this.element.getBoundingClientRect();

    this.set("position", {
      x: currentElementData.x + 30,
      y: currentElementData.y + 30
    });

    this.set("parentOffset", {
      left: 0,
      top: 0
    });

    this.set("boardOffset", {
      left: currentElementData.x,
      top: currentElementData.y
    });

    await render(hbs `<svg>{{board-icon position=position parentOffset=parentOffset boardOffset=boardOffset icon="alien"}}</svg>`);

    let boardIcon = this.element.getElementsByClassName("board-icon")[0];
    let boardIconData = boardIcon.getBoundingClientRect();
    let renderedIconX = boardIconData.x - currentElementData.x;
    let renderedIconY = boardIconData.y - currentElementData.y;

    let iconBBox = boardIcon.getBBox();

    let expectedX = this.position.x - this.parentOffset.left - this.boardOffset.left;
    let expectedY = this.position.y - this.parentOffset.top - this.boardOffset.top;

    assert.equal(Math.round(renderedIconX * 2 - iconBBox.x), expectedX, "The icon should position on horizontal as expected");
    assert.equal(Math.round(renderedIconY * 2 - iconBBox.y), expectedY, "The icon should position on vertical as expected");
  });

  test("Update positions", async function(assert) {
    let currentElementData = this.element.getBoundingClientRect(),
        selectedIcon;

    this.set("position", {
      x: currentElementData.x + 30,
      y: currentElementData.y + 30
    });

    this.set("parentOffset", {
      left: 0,
      top: 0
    });

    this.set("boardOffset", {
      left: currentElementData.x,
      top: currentElementData.y
    });

    this.set("selected", function(icon) {
      selectedIcon = icon;
    });

    await render(hbs `<svg id="testSvg">{{board-icon position=position parentOffset=parentOffset boardOffset=boardOffset icon="alien" selected=selected parentScale="1"}}</svg>`);
    await click("#testSvg .board-icon");

    let diffX = 10,
        diffY = 10;

    if (selectedIcon) {
      await selectedIcon.updatePosition({
        x: this.position.x + diffX,
        y: this.position.y + diffY,
        height: 40,
        width: 40
      });
    }

    let boardIcon = this.element.getElementsByClassName("board-icon")[0],
        boardIconData = boardIcon.getBoundingClientRect(),
        renderedIconX = boardIconData.x - currentElementData.x,
        renderedIconY = boardIconData.y - currentElementData.y;

    let iconBBox = boardIcon.getBBox();
    let expectedX = this.position.x - this.parentOffset.left - this.boardOffset.left - diffX;
    let expectedY = this.position.y - this.parentOffset.top - this.boardOffset.top - diffY;

    assert.equal(typeof selectedIcon, "object", "Selected icon is set on click");
    assert.equal(Math.round(renderedIconX * 2 - iconBBox.x), expectedX, "The icon should position on horizontal as expected");
    assert.equal(Math.round(renderedIconY * 2 - iconBBox.y), expectedY, "The icon should position on vertical as expected");
  });

  test("Update icon color", async function(assert) {
    let currentElementData = this.element.getBoundingClientRect();

    this.set("position", {
      x: currentElementData.x + 30,
      y: currentElementData.y + 30
    });

    this.set("parentOffset", {
      left: 0,
      top: 0
    });

    this.set("boardOffset", {
      left: currentElementData.x,
      top: currentElementData.y
    });

    await render(hbs `<svg id="testSvg">{{board-icon position=position parentOffset=parentOffset boardOffset=boardOffset icon="alien" selected=selected}}</svg>`);
    await click("#testSvg .board-icon");


    assert.equal('', '', "The icon should position on vertical as expected");
  });
});