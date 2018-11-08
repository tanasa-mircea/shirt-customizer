import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  attributeBindings: ['style'],
  style: '',

  willRender() {
    this.set('style', new htmlSafe('background-color: ' + this.get('color')));
  },

  click() {
    this.clickAction(this.get('color'));
  }
});
