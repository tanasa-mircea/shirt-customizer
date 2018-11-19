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
  },

  updateIconsIndexes: function() {
    let newIcons = this.icons.map(function(icon, index) {
      icon.currentIndex = index;

      return icon;
    })

    this.set('icons', newIcons);
  },

  setBoardActiveIcon(icon) {
    // let newIcons = this.icons.slice(icon.currentIndex, 1);
    // this.set('icons', newIcons);
    // this.updateIconsIndexes();

    this.set('boardActiveIcon', icon);
  },

  unsetBoardActiveIcon() {
    this.set('boardActiveIcon', null);
  },

  initBoard: function() {
    this.set('icons', []);
  }
});
