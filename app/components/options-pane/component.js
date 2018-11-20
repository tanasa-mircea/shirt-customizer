import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super();
  },

  actions: {
    optionChange(type, val) {
      this.optionChange(type, val);
    },

    iconAdded(icon) {
      this.iconAdded(icon);
    }
  }
});
