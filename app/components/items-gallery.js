import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['class'],

  willRender() {
    this.style = "";
    this.class = "items-gallery";

    if (this.rows && this.rows > 1)
      var style = this.get('style');
      this.set('style', new htmlSafe(style + 'flex-wrap: wrap;'));
  }
});
