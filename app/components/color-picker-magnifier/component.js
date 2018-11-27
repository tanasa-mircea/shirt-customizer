import Component from "@ember/component";
import {
  computed
} from "@ember/object";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";

export default Component.extend({
  classNameBindings: ["class"],
  class: "color-picker__magnifier",
  attributeBindings: ["style"],
  style: computed("position.{x,y}", "color", function() {
    return new HtmlSafe(`background-color: ${this.color};
                          top: ${this.position.y}px;
                          left: ${this.position.x}px`);
  })
});