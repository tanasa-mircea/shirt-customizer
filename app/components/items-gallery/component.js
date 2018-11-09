import Component from '@ember/component';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['class'],

  willRender() {
    this.style = "";
    this.class = "items-gallery";
    this.galleryItemStyle = new htmlSafe('width: ' + (100 / (this.options.itemsToDisplay / this.options.rows)) + '%;');
    console.log('this.options ', this.options)

    if (this.options.rows && this.options.rows > 1)
      var style = this.get('style');
      this.set('style', new htmlSafe(style + 'flex-wrap: wrap;'));
  }
});
