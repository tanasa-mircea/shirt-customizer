import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  classNameBindings: ['class'],
  attributeBindings: ['style'],
  positionStyle: '',
  dimensionStyle: '',
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

  handleLeftPoint: function() {

  },

  handleRightPoint: function(data) {
    let diffX = data.x - this.position.x - this.pointSide * 2;
    this.set('position.width', Math.max(this.minWidth, diffX));
    this.set('dimensionStyle', `height: ${ this.position.height }px; width: ${ this.position.width }px;`);
  },

  handleTopPoint: function() {

  },

  handleBottomPoint: function(data) {
    let diffY = data.y - this.position.y - this.pointSide * 2;
    this.set('position.height', Math.max(this.minWidth, diffY));
    this.set('dimensionStyle', `height: ${ this.position.height }px; width: ${ this.position.width }px;`);
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
    },

    pointMoveEnd: function(event) {
      this.resizeEnd({
        x: event.x,
        y: event.y,
        height: this.position.height,
        width: this.position.width
      })
    }
  },

  willRender() {
    this.set('positionStyle', `top: ${ this.position.y }px; left: ${ this.position.x }px;`);
    this.set('dimensionStyle', `height: ${ this.position.height }px; width: ${ this.position.width }px;`);
  }
});
