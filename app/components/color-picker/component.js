import Component from "@ember/component";
import { set } from "@ember/object";

export default Component.extend({
  init() {
    this._super();
    this.magnifierPosition = {};
  },

  mouseEnter() {
    this.set("isHovered", true);
  },

  mouseMove() {
    set(this.magnifierPosition, "x", event.x - 25);
    set(this.magnifierPosition, "y", event.y - 25);
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
