import Component from "@ember/component";

export default Component.extend({
  tagName: "canvas",
  width: 255,
  height: 100,
  style: "",
  attributeBindings: ["height", "width"],

  didInsertElement() {
    this.context = this.element.getContext("2d");
    this.drawCanvas();
  },

  drawCanvas: function() {
    let saturation = 100,
      row = 0,
      hueStep = 360 / this.width,
      saturationStep = 100 / this.height;

    while (saturation > 0) {
      let column = 0,
        hue = 0;

      while (hue < 360) {
        this.context.fillStyle = `hsl(${hue}, ${saturation}%, 50%)`;
        this.context.fillRect(column, row, 1, 1);
        hue = hue + hueStep;
        column++;
      }

      row++;
      saturation = saturation - saturationStep;
    }
  },

  // Move to utils
  toRgb(arr) {
    return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
  },

  click(event) {
    let color = this.context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
    this.change(this.toRgb(color));
  },

  mouseMove() {
    let color = this.context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
    this.hover(this.toRgb(color));
  }
});