import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: 'g',
  classNameBindings: ['class'],
  class: 'shirt-svg',
  attributeBindings: ['style', 'transform', 'index:data-index'],
  transform: computed('translateX', 'shirtSize', function() {
    return `translate(${ this.translateX * this.shirtSize } 0)`;
  }),
  size: null,
  shirtSize: computed('size', function() {
    console.log('size ', this.size)
    return this.sizeDictionary[this.size];
  }),
  shirtScale: computed('shirtSize', function() {
    return `scale(${ this.shirtSize })`;
  }),
  clipPathId: computed('index', function() {
    return `objectHolder${this.index}`;
  }),
  clipPathUrl: computed('clipPathId', function() {
    return `url(#${this.clipPathId})`;
  }),
  currentOffsets: computed('boardOffset.top', 'translateX', function() {
    return {
      left: this.translateX,
      top: 0
    }
  }),

  updateSize(size) {
    this.set("size", size);
  },

  init() {
    this._super();
    this.set('sizeDictionary', {
      "S": 0.9,
      "M": 1,
      "L": 1.1,
      "XL": 1.2
    })
  },

  actions: {
    iconMove: function(icon) {
      this.iconMove(icon);
    },
    iconSelected: function(icon) {
      this.iconSelected(icon);
    },
    replaceIconParent: function(icon, newParent) {
      this.replaceIconParent(icon, newParent);
    },
    removeIcon: function(icon) {
      this.removeIcon(icon);
    }
  }
});
