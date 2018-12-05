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

    await render(hbs `<svg id="testSvg">{{board-icon position=position parentOffset=parentOffset boardOffset=boardOffset icon="alien" parentScale="1"}}</svg>`);

    this.set("position", {
      x: this.position.x + 10,
      y: this.position.y + 10,
      height: 40,
      width: 40
    });

    let boardIcon = this.element.getElementsByClassName("board-icon")[0],
        boardIconData = boardIcon.getBoundingClientRect(),
        renderedIconX = boardIconData.x - currentElementData.x,
        renderedIconY = boardIconData.y - currentElementData.y;

    let iconBBox = boardIcon.getBBox();
    let expectedX = this.position.x - this.parentOffset.left - this.boardOffset.left;
    let expectedY = this.position.y - this.parentOffset.top - this.boardOffset.top;

    assert.equal(Math.round(renderedIconX * 2 - iconBBox.x), expectedX, "The icon should position on horizontal as expected");
    assert.equal(Math.round(renderedIconY * 2 - iconBBox.y), expectedY, "The icon should position on vertical as expected");
  });

  test("Update icon color", async function(assert) {
    let currentElementData = this.element.getBoundingClientRect(),
        boardIcon,
        iconFill,
        newColor = "rgb(255, 0, 0)",
        color = "#0f0";

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

    await render(hbs `<svg id="testSvg">{{board-icon position=position parentOffset=parentOffset boardOffset=boardOffset icon="alien" selected=selected color=color}}</svg>`);

    this.set("color", newColor);

    boardIcon = this.element.getElementsByClassName("board-icon")[0];
    iconFill = boardIcon.getAttribute("fill");

    assert.equal(iconFill, newColor, "The icon should be red");
  });
});