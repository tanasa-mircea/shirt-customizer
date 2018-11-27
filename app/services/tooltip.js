import Service from "@ember/service";
import { set } from "@ember/object";

export default Service.extend({
  currentTooltip: null,
  defaultPositions: null,

  init(...args) {
    this._super(args);
    this.initialize();
  },

  initialize: function() {
    this.set("defaultPositions", [{
      position: "top",
      offset: 40
    }, {
      position: "bottom",
      offset: 40
    }, {
      position: "right",
      offset: 40
    }, {
      position: "left",
      offset: 40
    }]);
  },

  show: function(options) {
    if (!this.currentTooltip) {
      throw "No tooltip instance";
    }

    if (!options.positions) {
      set(options, "positions", this.defaultPositions);
    }

    this.currentTooltip.show(options);
  },

  hide: function() {
    if (!this.currentTooltip) {
      throw "No tooltip instance";
    }

    this.currentTooltip.hide();
  },

  updatePosition: function(position) {
    this.set("position", position);
  },

  updateContent: function(content) {
    this.set("content", content);
  },

  setCurrentTooltip: function(tooltip) {
    this.set("currentTooltip" , tooltip);
  }

});