import Controller from '@ember/controller';

export default Controller.extend({
  init() {
    this._super();
    console.log('test')
  },
  currentColor: '#f00',
  actions: {
    colorChanged(color) {
      this.set('currentColor', color);
    }
  }
});
