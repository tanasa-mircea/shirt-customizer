import Component from "@ember/component";
import {
  set
} from "@ember/object";

const magnifierOffset = 25;

export default Component.extend({
  classNameBindings: ["class"],
  class: "color-picker",

  init() {
    this._super();
    this.magnifierPosition = {};
  },

  mouseEnter() {
    this.set("isHovered", true);
  },

  mouseMove() {
    set(this.magnifierPosition, "x", event.x - magnifierOffset);
    set(this.magnifierPosition, "y", event.y - magnifierOffset);
  },

  mouseLeave() {
    this.set("isHovered", false);
  },

  actions: {
    colorChanged: function(color) {
      this.optionChange("color", color);
    },

    canvasHover: function(color) {
      this.set("currentColor", color);
    }
  }
});