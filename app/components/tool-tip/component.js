import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Component.extend({
  classes: 'tooltip',
  classNameBindings: ['classes', 'visible'],
  tooltipService: service('tooltip'),
  visibleObserve: observer('tooltipService.visible', function() {
    this.set('visible', this.tooltipService.visible);
  }),
});
