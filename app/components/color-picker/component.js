import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';


export default Component.extend({
  magnifierStyle: computed('currentColor', 'magnifierPosition',  function() {
    return new htmlSafe(`background-color: ${this.currentColor}; top: ${this.magnifierPosition.y - 25}px; left: ${this.magnifierPosition.x - 25}px`);
  }),
  mouseEnter() {
    this.set('isHovered', true);
  },
  mouseMove() {
    this.set('magnifierPosition', {
      x: event.x,
      y: event.y
    })
  },
  mouseLeave() {
    this.set('isHovered', false);
  },

  init() {
    this._super();
    this.magnifierPosition = {};
  },

  actions: {
    colorChanged: function(color) {
      this.optionChange('color', color);
    },

    canvasHover: function(color) {
      this.set('currentColor', color);
    }
  }
});
