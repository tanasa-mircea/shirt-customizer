import Component from "@ember/component";
import { htmlSafe as HtmlSafe } from "@ember/template";
import { computed } from "@ember/object";


export default Component.extend({
  classNameBindings: ["class"],
  page: 1,
  itemsOnPage: 20,

  willRender() {
    this.set("class", "items-gallery");
    this.set("galleryItemStyle", new HtmlSafe("width: " + 10 + "%;"));
  },

  leftDisabled: computed("page", function() {
    return this.page <= 1;
  }),

  rightDisabled: computed("page", function() {
    return this.page * this.itemsOnPage >= this.options.icons.length;
  }),

  actions: {
    leftClickHandler: function() {
      this.set("page", Math.max(1, this.page - 1));
    },

    rightClickHandler: function() {
      this.incrementProperty("page");
      this.set("page", Math.min(2, this.page + 1));
    },

    iconDropped: function(icon) {
      this.optionChange("icon", icon);
    }
  }
});
