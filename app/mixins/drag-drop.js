import Mixin from '@ember/object/mixin';

export default Mixin.create({
  mouseDownOverride: function() {
    throw(new Error('Mouse down override should be overwritten by the extending class'));
  },

  mouseMoveOverride: function() {
    throw(new Error('Mouse down override should be overwritten by the extending class'));
  },

  mouseUpOverride: function() {
    throw(new Error('Mouse down override should be overwritten by the extending class'));
  },

  mouseDown(event) {
    this.isMouseDown = true;
    this.mouseDownOverride(event);
  },
  mouseMove(event) {
    if (this.isMouseDown) {
      this.mouseMoveOverride(event);
    }
  },
  mouseUp(event) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      this.mouseUpOverride(event);
    }
  }
});
