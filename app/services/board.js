import Service from '@ember/service';

export default Service.extend({
  icons: null,

  addIcon: function(icon) {
    let newIconsVector = this.icons.concat([icon]);
    this.set('icons', newIconsVector);
  },

  initBoard: function() {
    this.set('icons', []);
  }
});
