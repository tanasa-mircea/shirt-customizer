import Mixin from "@ember/object/mixin";

export default Mixin.create({
  mouseDownOverride: function() {
    throw (new Error("Mouse down override should be overwritten by the extending class"));
  },

  mouseMoveOverride: function() {
    throw (new Error("Mouse move override should be overwritten by the extending class"));
  },

  mouseUpOverride: function() {
    throw (new Error("Mouse up override should be overwritten by the extending class"));
  },

  mouseDown(event) {
    this.isMouseDown = true;
    this.mouseMoveRef = this.mouseMoveHandler.bind(this);
    this.mouseUpRef = this.mouseUpHandler.bind(this);

    window.addEventListener("mousemove", this.mouseMoveRef);
    window.addEventListener("mouseup", this.mouseUpRef);

    this.mouseDownOverride(event);
  },

  mouseMoveHandler: function(event) {
    if (this.isMouseDown) {
      this.mouseMoveOverride(event);
    }
  },

  mouseUpHandler: function(event) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      window.removeEventListener("mousemove", this.mouseMoveRef);
      window.removeEventListener("mouseup", this.mouseUpRef);

      this.mouseUpOverride(event);
    }
  }
});