import Component from "@ember/component";
import { htmlSafe as HtmlSafe } from "@ember/template";
import { computed } from "@ember/object";


export default Component.extend({
  classNameBindings: ["class"],
  page: 1,
  displayedPage: computed("page", function() {
    return this.page;
  }),

  willRender() {
    this.set("class", "items-gallery");
    this.set("galleryItemStyle", new HtmlSafe("width: " + 10 + "%;"));
  },

  actions: {
    leftClickHandler: function() {
      this.decrementProperty("page");
    },

    rightClickHandler: function() {
      this.incrementProperty("page");
    },

    iconDropped: function(icon) {
      this.optionChange("icon", icon);
    }
  }
});
