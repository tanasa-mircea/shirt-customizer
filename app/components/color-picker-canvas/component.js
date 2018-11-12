import Component from '@ember/component';

export default Component.extend({
  tagName: 'canvas',
  width: 255,
  height: 100,
  style: '',
  attributeBindings: ['height', 'width'],

  willRender: function() {
  },

  didRender() {
    this.canvas = this.get('element');
    this.context = this.canvas.getContext('2d');

    let hue,
        saturation = 100,
        row = 0,
        column,
        hueStep = 360 / this.width,
        saturationStep = 100 / this.height;

    while (saturation > 0) {
      column = 0,
      hue = 0;

      while (hue < 360) {
        this.context.fillStyle=`hsl(${hue}, ${saturation}%, 50%)`;
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
    // debugger
    let color = this.context.getImageData(event.offsetX, event.offsetY, 1, 1).data;

    this.change(this.toRgb(color));

  }
});
