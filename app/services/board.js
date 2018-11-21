import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  icons: null,
  boardActiveIcon: null,

  addIcon: function(icon) {
    if (!this.icons) {
      this.set('icons', {});
    }

    if (!this.icons[icon.parentId]) {
      this.icons[icon.parentId] = [];
    }

    icon.currentIndex = this.icons[icon.parentId].length;
    let newIconsVector = this.icons[icon.parentId].concat([icon]);

    set(this.icons, icon.parentId, newIconsVector);

    return icon;
  },

  removeIcon: function(icon) {
    let iconsCopy = [].concat(this.icons[icon.parentIndex]);
    iconsCopy.splice(icon.currentIndex, 1);

    set(this.icons, icon.parentIndex, iconsCopy);
    this.updateIconsIndexes();
  },

  updateIconsIndexes: function() {
    let typesArray = Object.keys(this.icons);

    for (let i = 0; i < typesArray.length; i++) {
      let newIconsArray = this.icons[typesArray[i]].map(function(icon, index) {
        set(icon, 'currentIndex', index);
        return icon;
      })

      set(this.icons, typesArray[i], newIconsArray);
    }
  },

  initBoard: function() {
    this.set('icons', []);
  }
});
