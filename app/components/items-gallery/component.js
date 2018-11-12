import Component from '@ember/component';
import { htmlSafe } from '@ember/template';
import { computed } from '@ember/object';


export default Component.extend({
  classNameBindings: ['class'],
  page: 1,
  displayedPage: computed('page', function() {
    // console.log('test ', this.page)
    return this.page
  }),

  willRender() {
    this.class = "items-gallery";
    this.galleryItemStyle = new htmlSafe('width: ' + 10 + '%;');
  },

  actions: {
    leftClickHandler: function() {
      this.decrementProperty('page');
    },

    rightClickHandler: function() {
      this.incrementProperty('page');
    }
  }
});
