import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  positionStyle: computed('position.{x,y}', function() {
    return `top: ${ this.position.y }px; left: ${ this.position.x }px;`;
  }),
  dimensionStyle: computed('position.{width,height}', function() {
    return `height: ${ this.position.height }px; width: ${ this.position.width }px;`;
  }),
  pointSide: 5,
  minWidth: 25,
  style: computed('positionStyle', 'dimensionStyle', function() {
    return new htmlSafe(this.positionStyle + this.dimensionStyle);
  }),
  class: 'resize-manager',

  init() {
    this._super();

    this.points = [
      {
        id: 'top-left',
        x: '0%',
        y: '0%'
      }, {
        id: 'top-right',
        x: '100%',
        y: '0%'
      }, {
        id: 'bottom-left',
        x: '0%',
        y: '100%'
      }, {
        id: 'bottom-right',
        x: '100%',
        y: '100%'
      }
    ];
  },

  handleLeftPoint: function(data) {
    let diffX = this.position.x - data.x + this.pointSide * 2,
        newWidth = diffX + this.position.width,
        newX = this.position.x - diffX;

    if (newWidth < this.minWidth) {
      return;
    }

    this.set('position.width', newWidth);
    this.set('position.x', newX);
  },

  handleRightPoint: function(data) {
    let diffX = data.x - this.position.x - this.pointSide * 2;
    this.set('position.width', Math.max(this.minWidth, diffX));
  },

  handleTopPoint: function(data) {
    let diffY = this.position.y - data.y + this.parentOffsets.top,
    newHeight = diffY + this.position.height,
    newY = this.position.y - diffY;

    if (newHeight < this.minWidth) {
      return;
    }

    this.set('position.height', newHeight);
    this.set('position.y', newY);
  },

  handleBottomPoint: function(data) {
    let diffY = data.y - this.position.y - this.parentOffsets.top;
    this.set('position.height', Math.max(this.minWidth, diffY));
  },

  actions: {
    pointMove: function(data) {
      if (data.id.indexOf('left') >= 0) {
        this.handleLeftPoint(data);
      }

      if (data.id.indexOf('right') >= 0) {
        this.handleRightPoint(data);
      }

      if (data.id.indexOf('top') >= 0) {
        this.handleTopPoint(data);
      }

      if (data.id.indexOf('bottom') >= 0) {
        this.handleBottomPoint(data);
      }

      let trueX = data.x,
          trueY = data.y;

      if (data.id.indexOf('bottom') >= 0 && data.x  ) {
        trueY = data.y - this.position.height;
      }

      if (data.id.indexOf('right') >= 0) {
        trueX = data.x - this.position.width;
      }

      this.resizeEnd({
        x: trueX,
        y: trueY,
        height: this.position.height,
        width: this.position.width
      })
    },

    pointMoveEnd: function() {
    }
  }
});
