import Controller from "@ember/controller";

export default Controller.extend({
  color: "#f00",
  size: "M",
  svg: null,
  imageUrl: null,
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