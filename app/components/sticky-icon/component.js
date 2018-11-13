import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';

export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class', 'hidden', 'dragged'],
  attributeBindings: ['style'],
  rawStyle: '',
  style: computed('rawStyle', function() {
    return new htmlSafe(this.rawStyle);
  }),
  hidden: false,
  dragged: false,
  showTooltip: false,
  class: 'sticky-icon',
  iconsService: service('icons'),
  boardService: service('board'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  mouseEnter() {
    this.set('showTooltip', true);
  },

  mouseLeave() {
    this.set('showTooltip', false);
  },

  mouseDownOverride: function() {
    let elementBoundingClient = this.element.getBoundingClientRect();

    this.set('hidden', true);
    this.set('dragged', true);
    this.set('originCoords', {
      x: elementBoundingClient.x,
      y: elementBoundingClient.y
    })
  },

  mouseMoveOverride: function(event) {
    this.set('rawStyle', `left: ${ event.x - this.originCoords.x }px; top: ${ event.y - this.originCoords.y }px;`)
  },

  mouseUpOverride: function(event) {
    this.set('hidden', false);
    this.set('dragged', false);
    this.set('rawStyle', '');

    if (event.target.matches('path')) {
      this.boardService.addIcon({
        icon: this.icon,
        position: {
          x: event.x,
          y: event.y
        }
      });
    }
  }
});
