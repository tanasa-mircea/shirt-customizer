import Component from "@ember/component";
import {
  inject as service
} from "@ember/service";
import {
  computed,
  observer
} from "@ember/object";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";

export default Component.extend({
  classes: "tooltip",
  classNameBindings: ["classes", "visible"],
  attributeBindings: ["style"],
  tooltipService: service("tooltip"),
  visibleObserve: observer("tooltipService.visible", function() {
    this.set("visible", this.tooltipService.visible);
  }),

  positionTop: computed("tooltipService.position.y", function() {
    if (!this.tooltipService.position) {
      return "";
    }

    let tooltipTop = this.tooltipService.position.y;

    if (tooltipTop + this.element.clientHeight > window.innerHeight) {
      tooltipTop = this.tooltipService.position.minY;
    }

    return `top: ${tooltipTop}px;`;
  }),

  positionLeft: computed("tooltipService.position.x", function() {
    if (!this.tooltipService.position) {
      return "";
    }

    let tooltipLeft = this.tooltipService.position.x;

    if (tooltipLeft + this.element.clientWidth > window.innerWidth) {
      return `right: ${window.innerWidth - this.tooltipService.position.minX}px`;
    }

    return `left: ${tooltipLeft}px;`;
  }),

  style: computed("positionTop", "positionLeft", function() {
    return new HtmlSafe(this.positionTop + this.positionLeft);
  }),

  sanitizedContent: computed("tooltipService.content.{type,body}", function() {
    if (!this.tooltipService.content) {
      return "";
    }

    return new HtmlSafe(this.tooltipService.content.body);
  })
});