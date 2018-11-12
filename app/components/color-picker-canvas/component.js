import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  tagName: 'canvas',
  width: 400,
  height: 100,
  style: '',
  attributeBindings: ['height', 'style', 'width'],

  willRender: function() {
    this.set('style', new htmlSafe('width: 100%'));
  },

  didRender() {
    this.canvas = this.get('element');
    this.context = this.canvas.getContext('2d');

    let hue,
        saturation = 100,
        row = 0,
        column,
        step = 1,
        pointSize = 1;
        // pointSize = this.canvas.offsetWidth / 360;

    while (saturation > 0) {
      column = 0,
      hue = 0;

      while (hue < 360) {
        this.context.fillStyle=`hsl(${hue}, ${saturation}%, 50%)`;
        this.context.fillRect(column * pointSize, row * pointSize, pointSize, pointSize);
        hue = hue + step;
        column++;
      }

      row++;
      saturation = saturation - step;
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
