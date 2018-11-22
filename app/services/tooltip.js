import Service from "@ember/service";

export default Service.extend({
  visible: false,
  position: null,
  content: null,

  show: function() {
    this.set("visible", true);
  },

  hide: function() {
    this.set("visible", false);
  },

  updatePosition: function(position) {
    this.set("position", position);
  },

  updateContent: function(content) {
    this.set("content", content);
  }
});
