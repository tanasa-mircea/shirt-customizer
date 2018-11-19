import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';

export default Component.extend({
  classes: 'tooltip',
  classNameBindings: ['classes', 'visible'],
  tooltipService: service('tooltip'),
  visibleObserve: observer('tooltipService.visible', function() {
    this.set('visible', this.tooltipService.visible);
  }),

  init() {
    this._super();
    console.log('test ', this.visible)
    console.log('test serv ', this.tooltipService.visible)
  }
});
