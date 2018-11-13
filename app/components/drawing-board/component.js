import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';

export default Component.extend({
  boardService: service('board'),
  icons: computed('boardService.icons', function() {
    return this.boardService.icons;
  }),

  selectedItem: null,
  shirtColor: '#f00',

  colorChanged: observer('color', function() {
    if (this.selectedItem) {
      this.selectedItem.changeColor(this.color);
    } else {
      this.set('shirtColor', this.color);
    }
  }),


  init() {
    this._super();
    this.boardService.initBoard();
  },

  didInsertElement() {
    this.parentOffsets = {
      left: this.element.offsetLeft,
      top: this.element.offsetTop
    }
  },

  actions: {
    iconSelected: function(icon) {
      this.selectedItem = icon;
    }
  }
});
