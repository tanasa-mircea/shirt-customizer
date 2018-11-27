import Component from "@ember/component";
import {
  computed
} from "@ember/object";

export default Component.extend({
  tagName: "g",
  classNameBindings: ["class"],
  class: "shirt-svg",
  attributeBindings: ["style", "transform", "index:data-index"],
  transform: computed("translateX", "size", function() {
    return `translate(${this.translateX * this.size} 0)`;
  }),
  size: null,
  shirtScale: computed("size", function() {
    return `scale(${this.size})`;
  }),
  clipPathId: computed("index", function() {
    return `objectHolder${this.index}`;
  }),
  clipPathUrl: computed("clipPathId", function() {
    return `url(#${this.clipPathId})`;
  }),
  currentOffsets: computed("boardOffset.top", "translateX", function() {
    return {
      left: this.translateX,
      top: 0
    };
  }),

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