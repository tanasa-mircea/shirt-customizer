import Component from "@ember/component";

export default Component.extend({
  tagName: "canvas",
  width: 255,
  height: 100,
  imageUrl: null,

  attributeBindings: ["height", "width"],
  didInsertElement() {
    let svgStrigified = new XMLSerializer().serializeToString(this.svg),
      svgBBox = this.svg.getBBox();

    this.set("height", svgBBox.height + 2);
    this.set("width", svgBBox.width + 2);
    let canvasContext = this.element.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgStrigified], {
      type: "image/svg+xml;charset=utf-8"
    });
    var url = DOMURL.createObjectURL(svg);

    img.onload = function() {
      canvasContext.drawImage(img, 0, 0);
      var png = this.element.toDataURL("image/png");
      DOMURL.revokeObjectURL(png);
      this.svgConverted(png);
    }.bind(this);
    img.src = url;
  }
});