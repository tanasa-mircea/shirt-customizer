import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  boardService: service('board'),
  icons: computed('boardService.icons', function() {
    return this.boardService.icons;
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
  }
});
