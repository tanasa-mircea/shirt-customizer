import Component from "@ember/component";

export default Component.extend({
  classNameBindings: ["class"],
  class: "radio-gallery",
  currentSelected: null,

  didInsertElement() {
    this.set("currentSelected", this.options.selected);
    this.optionChange("size", this.options.selected);
  },

  actions: {
    inputChange: function(newVal) {
      this.set("currentSelected", newVal);
      this.optionChange("size", newVal);
    }
  }
});
