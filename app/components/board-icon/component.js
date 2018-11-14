import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';


export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  positionStyle: '',
  dimensionStyle: computed('height', 'width', function() {
    console.log('dimensionStyle')
    return `height: ${ this.height }px; width: ${ this.width }px`;
  }),
  style: computed('positionStyle', 'dimensionStyle', function() {
    return new htmlSafe(this.positionStyle + `fill: ${ this.color };` + this.dimensionStyle);
  }),
  color: '#000',
  class: 'board-icon',
  width: 40,
  height: 40,
  iconsService: service('icons'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  didInsertElement() {
    this.set('positionStyle', `top: ${ this.position.y - this.parentOffsets.top }px; left: ${ this.position.x - this.parentOffsets.left}px;`);
  },

  mouseDownOverride: function(event) {
    // Workaround Chrome trigger mousemove at mousedown sometimes https://bugs.chromium.org/p/chromium/issues/detail?id=721341
    this.mouseDownPosition = {
      x: event.clientX,
      y: event.clientY,
    }
  },

  mouseMoveOverride: function(event) {
    if (this.mouseDownPosition.x === event.x && this.mouseDownPosition.y === event.y) {
      return;
    }


    this.set('hasMoved', true);
    this.set('positionStyle', `top: ${ event.y - this.parentOffsets.top }px; left: ${ event.x - this.parentOffsets.left}px;`);
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
  },

  updatePosition: function(position) {
    this.set('width', position.width);
    this.set('height', position.height);
    this.set('position.x', position.x);
    this.set('position.y', position.y);
  }
});
