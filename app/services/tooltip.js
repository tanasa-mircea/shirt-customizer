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
      position: "right",
      offset: 10
    }, {
      position: "bottom",
      offset: 10
    }, {
      position: "left",
      offset: 10
    }, {
      position: "top",
      offset: 10
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

  setCurrentTooltip: function(tooltip) {
    this.set("currentTooltip" , tooltip);
  }

});