import Component from '@ember/component';

export default Component.extend({

  actions: {
    colorChanged(color) {
      this.colorChanged(color);
    },

    iconAdded(icon) {
      this.iconAdded(icon);
    }
  }
});
