import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super();
    this.icons = [];
  },

  currentColor: '#f00',
  actions: {
    colorChanged(color) {
      this.set('currentColor', color);
    },

    iconAdded(icon) {
    }
  }
});
