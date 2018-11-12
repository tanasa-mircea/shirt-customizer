import Component from '@ember/component';

export default Component.extend({
  classes: 'tooltip',
  visible: false,
  classNameBindings: ['classes', 'visible'],
});
