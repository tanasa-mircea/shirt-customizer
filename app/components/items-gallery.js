import Component from '@ember/component';

export default Component.extend({
  attributeBindings: ['style'],
  classNameBindings: ['class'],

  willRender() {
    this.style = "";
    this.class = "items-gallery";

    if (this.rows && this.rows > 1)
      this.style += "flex-wrap: wrap;";
  }
});
