import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, observer } from '@ember/object';

export default Component.extend({
  boardService: service('board'),
  icons: computed('boardService.icons', function() {
    return this.boardService.icons;
  }),
  boardActiveIcon: computed('boardService.boardActiveIcon', function() {
    return this.boardService.boardActiveIcon;
  }),

  selectedItem: null,
  shirtColor: '#ccc',
  showResize: computed('selectedItem', function() {
    if (this.selectedItem) {
      return true;
    }

    return false
  }),

  resizePosition: computed('selectedItem', function() {
    if (this.selectedItem) {
      return {
        x: this.selectedItem.position.x - this.element.offsetLeft,
        y: this.selectedItem.position.y - this.element.offsetTop,
        width: this.selectedItem.width,
        height: this.selectedItem.height
      };
    }

    return {};
  }),

  colorChanged: observer('color', function() {
    if (this.selectedItem) {
      this.selectedItem.changeColor(this.color);
    } else {
      this.set('shirtColor', this.color);
    }
  }),

  documentClickHandler: function(event) {
    let isIcon = event.target.closest('.board-icon, sticky-icon'),
        isResize = event.target.closest('.resize-manager, .options-pane__option canvas, items-gallery__nav > div');

    if (!isResize && !isIcon) {
      this.set('selectedItem', null);
    }
  },

  init() {
    this._super();
    this.boardService.initBoard();
    this.shirts = {
      front: {
        icons: [],
        translateX: 25
      },
      back: {
        icons: [],
        translateX: 225
      },
      side: {
        icons: [],
        translateX: 425
      }
    }

    document.addEventListener('mousedown', this.documentClickHandler.bind(this));
  },

  didInsertElement() {
    this.set('boardOffset', {
      left: this.element.offsetLeft,
      top: this.element.offsetTop
    })
  },

  actions: {
    iconSelected: function(icon) {
      this.set('selectedItem', icon);
    },

    resizeEnd: function(position) {
      this.selectedItem.updatePosition(position);
    },

    iconMove: function(icon) {
      if (this.selectedItem !== icon) {
        return;
      }

      this.set('selectedItem', null);
      this.set('selectedItem', icon);
    },

    removeIcon: function(icon) {
      this.boardService.removeIcon(icon)
    },

    replaceIconParent: function(icon, newParent) {
      let isSelected = this.selectedItem ? true : false;

      this.boardService.addIcon({
        parentId: newParent,
        icon: icon.icon,
        position: {
          x: icon.position.x,
          y: icon.position.y
        },
        width: icon.width,
        height: icon.height,
        selected: isSelected
      })
    }
  }
});
