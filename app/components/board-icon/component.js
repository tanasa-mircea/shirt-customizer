import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';


export default Component.extend(DragNDropMixin, {
  tagName: 'g',
  classNameBindings: ['class', 'invisible'],
  attributeBindings: ['style', 'positionStyle:transform'],
  positionStyle: computed('position.{x,y}', function() {
    return `translate(${ this.position.x - this.parentOffset.left - this.boardOffset.left }, ${ this.position.y - this.parentOffset.top - this.boardOffset.top })`;
  }),
  dimensionStyle: computed('height', 'width', function() {
    return `height: ${ this.height }px; width: ${ this.width }px`;
  }),
  style: computed('dimensionStyle', 'color', function() {
    return new htmlSafe(`fill: ${ this.color };` + this.dimensionStyle);
  }),
  color: '#000',
  class: 'board-icon',
  invisible: false,
  width: 40,
  height: 40,
  iconsService: service('icons'),
  boardService: service('board'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  didInsertElement() {
    if (this.isSelected) {
      this.selected(this);
    }
  },

  mouseDownOverride: function(event) {
    // Workaround Chrome trigger mousemove at mousedown sometimes https://bugs.chromium.org/p/chromium/issues/detail?id=721341
    this.mouseDownPosition = {
      x: event.pageX,
      y: event.pageY,
      insideX: event.pageX - this.position.x,
      insideY: event.pageY - this.position.y
    }
  },

  mouseMoveOverride: function(event) {
    if (this.mouseDownPosition.x === event.x && this.mouseDownPosition.y === event.y) {
      return;
    }

    if (!this.invisible) {
      this.set('invisible', true);

      this.cloneElement = this.element.cloneNode(true);

      let board = this.element.closest('.drawing-board');
      board.appendChild(this.cloneElement);
    }

    if (!this.hasMoved) {
      this.set('hasMoved', true);
    }

    this.set('position.x', event.x - this.mouseDownPosition.insideX);
    this.set('position.y', event.y - this.mouseDownPosition.insideY);
    this.move(this);

    this.cloneElement.classList.add('icon-clone');
    this.cloneElement.style.transform = `translate(${ event.x - this.boardOffset.left - this.mouseDownPosition.insideX }px, ${ event.y - this.boardOffset.top - this.mouseDownPosition.insideY}px)`;
  },

  mouseUpOverride: function(event) {
    if (!this.hasMoved) {
      this.selected(this);

      return;
    }

    this.set('invisible', false);
    this.set('position.x', event.x - this.mouseDownPosition.insideX);
    this.set('position.y', event.y - this.mouseDownPosition.insideY);
    this.set('hasMoved', false);

    let shirtParent = event.target.closest('.shirt-svg');
    if (shirtParent && shirtParent.dataset.index !== this.parentIndex) {
      this.replaceParent(this, shirtParent.dataset.index);
      this.removeIcon(this);
    }

    if (this.cloneElement) {
      let board = this.element.closest('.drawing-board');
      board.removeChild(this.cloneElement);
    }

    if (!shirtParent) {
      this.removeIcon(this);
    }
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
