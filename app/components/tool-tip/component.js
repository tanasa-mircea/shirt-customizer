import Component from "@ember/component";
import {
  inject as service
} from "@ember/service";
import {
  computed
} from "@ember/object";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";

export default Component.extend({
  classes: "tooltip",
  classNameBindings: ["classes", "visible"],
  attributeBindings: ["style"],
  tooltipService: service("tooltip"),
  options: null,
  positionsConfig: null,
  position: computed("options.{positions,target}", function() {
    if (!this.options || !this.element) {
      return [0, 0];
    }

    let computedPosition;

    for (let i = 0; i < this.options.positions.length; i++) {
      const positionData = this.options.positions[i];
      const currentConfig = this.positionsConfig[positionData.position];

      computedPosition = currentConfig.canShow.call(this, {
        target: this.options.target,
        offset: positionData.offset,
        before: currentConfig.before
      });

      if (computedPosition) {
        break;
      }
    }

    return computedPosition;
  }),
  style: computed("position", function() {
    return new HtmlSafe(`left: ${this.position[0]}px; top: ${this.position[1]}px;`);
  }),

  init(...args) {
    this._super(args);
    this.initialize();
  },

  initialize: function() {
    this.tooltipService.setCurrentTooltip(this);
    this.set("positionsConfig", {
      top: {
        canShow: this.verticalPositionCompute,
        before: true
      },
      bottom: {
        canShow: this.verticalPositionCompute,
        before: false
      },
      left: {
        canShow: this.horizontalPositionCompute,
        before: true
      },
      right: {
        canShow: this.horizontalPositionCompute,
        before: false
      }
    });
  },

  show: function(options) {
    this.set("options", options);
    this.set("visible", true);
  },

  hide: function() {
    this.set("visible", false);
  },

  verticalPositionCompute: function(data) {
    const boundingRect = data.target.getBoundingClientRect();
    const positionX = boundingRect.x - (boundingRect.width / 2);
    let positionY;

    if (data.before) {
      positionY = boundingRect.y - this.element.clientHeight - data.offset;

      if (positionY < 0) {
        return false;
      }

      return [positionX, positionY];
    }

    positionY = boundingRect.y + boundingRect.height + data.offset;

    if ((positionY + this.element.clientHeight) > window.innerHeight) {
      return false;
    }

    return [positionX, positionY];
  },

  horizontalPositionCompute: function(data) {
    const boundingRect = data.target.getBoundingClientRect();
    const positionY = boundingRect.y - (boundingRect.height / 2);
    let positionX;

    if (data.before) {
      positionX = boundingRect.x - this.element.clientWidth - data.offset;

      if (positionX < 0) {
        return false;
      }

      return [positionX, positionY];
    }

    positionX = boundingRect.x + boundingRect.width + data.offset;

    if ((positionX + this.element.clientWidth) > window.innerWidth) {
      return false;
    }

    return [positionX, positionY];
  }
});