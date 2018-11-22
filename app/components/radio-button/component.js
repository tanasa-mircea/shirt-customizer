import Component from "@ember/component";

export default Component.extend({
  classNameBindings: ["class", "active"],
  class: "radio-button",
  click() {
    this.change(this.option);
  }
});
