import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { inject as service } from '@ember/service';

export default Component.extend({
  showTooltip: false,
  iconsService: service('icons'),
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.iconsService.get(this.icon));
  }),

  mouseEnter() {
    this.set('showTooltip', true);
  },

  mouseLeave() {
    this.set('showTooltip', false);
  }
});
