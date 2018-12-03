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
  position: computed("options.{positions,target,parent}", function() {
    if (!this.options) {
      return [0, 0];
    }

    let computedPosition;
    let tooltipParent = this.options.parent;
    const tooltipElementBackupData = {
      width: 100,
      height: 100
    };

    if (!tooltipParent) {
      tooltipParent = {
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    for (let i = 0; i < this.options.positions.length; i++) {
      const positionData = this.options.positions[i];
      const currentConfig = this.positionsConfig[positionData.position];


      computedPosition = currentConfig.canShow.call(this, {
        target: this.options.target,
        parent: tooltipParent,
        offset: positionData.offset,
        before: currentConfig.before,
        tooltipData: tooltipElementBackupData
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
    const boundingRect = data.target;
    const positionX = boundingRect.x - (boundingRect.width / 2);
    const elementHeight = this.element ? this.element.clientHeight : data.tooltipData.height;
    let positionY;

    if (data.before) {
      positionY = boundingRect.y - elementHeight - data.offset;

      if (positionY < 0) {
        return false;
      }

      return [positionX, positionY];
    }

    positionY = boundingRect.y + boundingRect.height + data.offset;

    if ((positionY + elementHeight) > data.parent.y + data.parent.height) {
      return false;
    }

    return [positionX, positionY];
  },

  horizontalPositionCompute: function(data) {
    const boundingRect = data.target;
    const positionY = boundingRect.y - (boundingRect.height / 2);
    const elementWidth = this.element ? this.element.clientWidth : data.tooltipData.width;
    let positionX;
    if (data.before) {
      positionX = boundingRect.x - elementWidth - data.offset;

      if (positionX < 0) {
        return false;
      }

      return [positionX, positionY];
    }

    positionX = boundingRect.x + boundingRect.width + data.offset;

    if ((positionX + elementWidth) > data.parent.x + data.parent.width) {
      return false;
    }

    return [positionX, positionY];
  }
});