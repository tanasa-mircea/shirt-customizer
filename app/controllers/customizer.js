import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super();
    this.icons = [];
  },

  color: '#f00',
  actions: {
    optionChange(type, value) {
      this.set(type, value);
    },

    iconAdded() {
    }
  }
});
