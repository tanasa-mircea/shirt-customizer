import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';


export default Component.extend(DragNDropMixin, {
  tagName: 'g',
  classNameBindings: ['class'],
  attributeBindings: ['style', 'positionStyle:transform'],
  positionStyle: computed('position.{x,y}', function() {
    return `translate(${ this.position.x - this.parentOffsets.left}, ${ this.position.y - this.parentOffsets.top })`;
  }),
  dimensionStyle: computed('height', 'width', function() {
    return `height: ${ this.height }px; width: ${ this.width }px`;
  }),
  style: computed('dimensionStyle', 'color', function() {
    return new htmlSafe(`fill: ${ this.color };` + this.dimensionStyle);
  }),
  color: '#000',
  class: 'board-icon',
  width: 40,
  height: 40,
  iconsService: service('icons'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  mouseDownOverride: function(event) {
    console.log('mouseDOwn');
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
    this.set('position.x', event.x);
    this.set('position.y', event.y);
    this.move(this);
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
