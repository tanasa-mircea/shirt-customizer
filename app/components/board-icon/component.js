import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';


export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  rawStyle: '',
  style: computed('rawStyle', function() {
    return new htmlSafe(this.rawStyle);
  }),
  class: 'board-icon',
  iconsService: service('icons'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  didInsertElement() {
    this.set('rawStyle', `top: ${ this.position.y - this.parentOffsets.top }px; left: ${ this.position.x - this.parentOffsets.left}px;`);
  },

  mouseDownOverride: function() {

  },

  mouseMoveOverride: function(event) {
    this.set('rawStyle', `top: ${ event.y - this.parentOffsets.top }px; left: ${ event.x - this.parentOffsets.left}px;`);
  },

  mouseUpOverride: function(event) {
    this.set('position.x', event.x);
    this.set('position.y', event.y);
  }


});
