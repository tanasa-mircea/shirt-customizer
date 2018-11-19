import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';
import DragNDropMixin from '../../mixins/drag-drop';

export default Component.extend(DragNDropMixin, {
  classNameBindings: ['class', 'hidden', 'dragged'],
  tagName: 'g',
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
  tooltipService: service('tooltip'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  mouseEnter() {
    this.tooltipService.updatePosition({
      x: 0,
      y: 0
    });
    this.tooltipService.updateContent({
      type: 'text',
      body: 'testtest'
    })
    this.tooltipService.show();
  },

  mouseLeave() {
    this.tooltipService.hide();
  },

  mouseDownOverride: function(event) {
    let elementBoundingClient = this.element.getBoundingClientRect();
    this.set('hidden', true);
    this.set('dragged', true);
    this.set('originCoords', {
      x: elementBoundingClient.x,
      y: elementBoundingClient.y,
      insideX : event.pageX - elementBoundingClient.x,
      insideY : event.pageY - elementBoundingClient.y
    })
  },

  mouseMoveOverride: function(event) {
    this.set('rawStyle', `left: ${ event.x - this.originCoords.insideX - this.originCoords.x }px; top: ${ event.y - this.originCoords.insideY - this.originCoords.y }px;`)
  },

  mouseUpOverride: function(event) {
    this.set('hidden', false);
    this.set('dragged', false);
    this.set('rawStyle', '');

    let shirtParent = event.target.closest('.shirt-svg');
    if (shirtParent) {
      this.boardService.addIcon({
        parentId: shirtParent.dataset.index,
        icon: this.icon,
        position: {
          x: event.x - this.originCoords.insideX,
          y: event.y - this.originCoords.insideY
        },
        width: 40,
        height: 40
      });
    }
  }
});
