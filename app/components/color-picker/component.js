import Component from '@ember/component';

export default Component.extend({
  generateRow: function(saturation, lightness) {
    let row = [];

    for (let hue = 0; hue <= 360; hue = hue + 5) {
      row.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

    }

    return row;
  },

  willRender() {
    let lightness = 50,
        saturation = 100;

    this.colorPoints = [];


    while (saturation >= 0) {
      let newRow = this.generateRow(saturation, lightness);
      this.colorPoints.push(newRow);
      saturation = saturation - 5;
    }
  },

  actions: {
    pointClicked(color) {
      this.colorChanged(color);
    },

    changeSelection(newSelection) {
      this.set('currentSelection', newSelection);
    }
  }
});
