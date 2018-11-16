import Service from '@ember/service';
import { set } from '@ember/object';


export default Service.extend({
  icons: null,

  addIcon: function(icon) {
    if (!this.icons) {
      this.set('icons', {});
    }

    if (!this.icons[icon.parentId]) {
      this.icons[icon.parentId] = [];
    }

    let newIconsVector = this.icons[icon.parentId].concat([icon]);
    set(this.icons, icon.parentId, newIconsVector);
  },

  initBoard: function() {
    this.set('icons', []);
  }
});
