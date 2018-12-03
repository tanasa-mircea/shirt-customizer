import Component from "@ember/component";
import {
  computed
} from "@ember/object";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";
import {
  inject as service
} from "@ember/service";
import DragNDropMixin from "../../mixins/drag-drop";

export default Component.extend(DragNDropMixin, {
  classNameBindings: ["class", "hidden", "dragged"],
  tagName: "g",
  attributeBindings: ["style"],
  rawStyle: "",
  style: computed("rawStyle", function() {
    return new HtmlSafe(this.rawStyle);
  }),
  hidden: false,
  dragged: false,
  showTooltip: false,
  class: "sticky-icon",
  iconsService: service("icons"),
  tooltipService: service("tooltip"),
  sanitizedIcon: computed("icon", function() {
    return new HtmlSafe(this.iconsService.get(this.icon));
  }),

  mouseEnter() {
    let boundingClientRect = this.element.getBoundingClientRect();

    let tooltipOptions = {
      target: boundingClientRect,
      content: {
        component: "tooltip-icon",
        componentOptions: {
          icon: this.icon
        }
      }
    };

    this.tooltipService.show(tooltipOptions);
  },

  mouseLeave() {
    this.tooltipService.hide();
  },

  mouseDownOverride: function(event) {
    let elementBoundingClient = this.element.getBoundingClientRect();
    this.set("hidden", true);
    this.set("dragged", true);
    this.set("originCoords", {
      x: elementBoundingClient.x,
      y: elementBoundingClient.y,
      insideX: event.pageX - elementBoundingClient.x,
      insideY: event.pageY - elementBoundingClient.y
    });
  },

  mouseMoveOverride: function(event) {
    this.set("rawStyle", `left: ${event.x - this.originCoords.insideX - this.originCoords.x}px;
                          top: ${event.y - this.originCoords.insideY - this.originCoords.y}px;`);
  },

  mouseUpOverride: function(event) {
    this.set("hidden", false);
    this.set("dragged", false);
    this.set("rawStyle", "");

    let shirtParent = event.target.closest(".shirt-svg");
    if (shirtParent) {
      this.dropped({
        parentId: shirtParent.dataset.index,
        icon: this.icon,
        color: "#000",
        position: {
          x: event.x - this.originCoords.insideX,
          y: event.y - this.originCoords.insideY
        },
        width: 40,
        height: 40
      });
    }
  }
});