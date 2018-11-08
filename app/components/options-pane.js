import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super();
    this.icons = ['alien', 'ufo', 'asteroid', 'blackhole', 'chewbaka', 'earth', 'iss', 'rick'];
  },

  actions: {
    colorChanged(color) {
      this.colorChanged(color);
    },

    iconAdded(icon) {
      this.iconAdded(icon);
    }
  }
});
