import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';
import DragNDropMixin from '../../mixins/drag-drop';

export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  rawStyle: '',
  style: computed('rawStyle', function() {
    return new htmlSafe(this.rawStyle);
  }),
  class: 'resize-point',

  init() {
    this._super();

    this.set('rawStyle', `top: calc(${ this.position.y } - 2.5px); left: calc(${ this.position.x } - 2.5px);`);
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
