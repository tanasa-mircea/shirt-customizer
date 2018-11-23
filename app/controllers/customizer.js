import Controller from "@ember/controller";

export default Controller.extend({
  init() {
    this._super();
    this.icons = [];
  },

  color: "#f00",
  overlayDisplayed: false,
  actions: {
    optionChange(type, value) {
      this.set(type, value);
    },

    closeOverlay() {
      this.set("overlayDisplayed", false);
    },

    save() {
      this.set("overlayDisplayed", true);
    },

    saveDrawingboardSvg(svg) {
      this.set("svg", svg[0]);
    },

    svgConverted(image) {
      this.set("imageUrl", image);
    }
  }
});
