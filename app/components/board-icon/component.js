import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';


export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  rawStyle: '',
  style: computed('rawStyle', 'color', function() {
    return new htmlSafe(this.rawStyle + `fill: ${ this.color };`);
  }),
  color: '#000',
  class: 'board-icon',
  iconsService: service('icons'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  didInsertElement() {
    this.set('rawStyle', `top: ${ this.position.y - this.parentOffsets.top }px; left: ${ this.position.x - this.parentOffsets.left}px;`);
  },

  mouseDownOverride: function(event) {
    // Workaround Chrome trigger mousemove at mousedown sometimes https://bugs.chromium.org/p/chromium/issues/detail?id=721341
    this.mouseDownPosition = {
      x: event.clientX,
      y: event.clientY
    }
  },

  mouseMoveOverride: function(event) {
    if (this.mouseDownPosition.x === event.x && this.mouseDownPosition.y === event.y) {
      return;
    }


    this.set('hasMoved', true);
    this.set('rawStyle', `top: ${ event.y - this.parentOffsets.top }px; left: ${ event.x - this.parentOffsets.left}px;`);
  },

  mouseUpOverride: function(event) {
    if (this.hasMoved) {
      this.set('position.x', event.x);
      this.set('position.y', event.y);
      this.set('hasMoved', false);
      return;
    }


    this.selected(this);
  },

  changeColor: function(color) {
    this.set('color', color);
  }
});
