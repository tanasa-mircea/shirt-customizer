import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import DragNDropMixin from '../../mixins/drag-drop';

export default Component.extend(DragNDropMixin, {
  tagName: 'rect',
  classNameBindings: ['class'],
  attributeBindings: ['style', 'x', 'y'],
  rawStyle: '',
  x: 0,
  y: 0,
  style: computed('rawStyle', function() {
    return new htmlSafe(this.rawStyle);
  }),
  class: 'resize-point',

  init() {
    this._super();
    this.set('x', this.position.x);
    this.set('y', this.position.y);
  },

  mouseDownOverride: function() {
  },

  mouseMoveOverride: function(event) {
    this.move({
      x: event.x,
      y: event.y,
      id: this.position.id
    });
  },

  mouseUpOverride: function(event) {
    this.moveEnd({
      x: event.x,
      y: event.y,
      id: this.position.id
    })
  },
});
