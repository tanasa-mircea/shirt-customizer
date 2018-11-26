import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { computed, observer, set } from "@ember/object";

export default Component.extend({
  boardService: service("board"),
  classNameBindings: ["class"],
  tagName: "svg",
  class: "drawing-board",
  icons: computed("boardService.icons", function() {
    return this.boardService.icons;
  }),
  boardActiveIcon: computed("boardService.boardActiveIcon", function() {
    return this.boardService.boardActiveIcon;
  }),
  intSize: computed("size", function() {
    if (!this.size) {
      return 1;
    }

    return this.sizeDictionary[this.size];
  }),
  selectedItem: null,
  shirtColor: "#ccc",
  showResize: computed("selectedItem", function() {
    if (this.selectedItem) {
      return true;
    }

    return false;
  }),

  svgWidth: computed("intSize", function() {
    return this.intSize * (400 + 85);
  }),

  svgHeight: computed("intSize", function() {
    return this.intSize * 195;
  }),

  resizePosition: computed("selectedItem", function() {
    if (this.selectedItem) {
      let drawingBoardClientRect = this.element.getBoundingClientRect();

      return {
        x: this.selectedItem.position.x * this.intSize - drawingBoardClientRect.left * this.intSize,
        y: this.selectedItem.position.y * this.intSize - drawingBoardClientRect.top * this.intSize,
        width: this.selectedItem.width * this.intSize,
        height: this.selectedItem.height * this.intSize
      };
    }

    return {};
  }),

  newIconDropped: observer("newIcon", function() {
    if (this.newIcon) {
      let newIcon = Object.assign({}, this.newIcon);
      set(newIcon.position, "x", newIcon.position.x / this.intSize);
      set(newIcon.position, "y", newIcon.position.y  / this.intSize);
      this.boardService.addIcon(newIcon);
    }
  }),

  colorChanged: observer("color", function() {
    if (this.selectedItem) {
      this.selectedItem.changeColor(this.color);
    } else {
      this.set("shirtColor", this.color);
    }
  }),

  documentClickHandler: function(event) {
    let isIcon = event.target.closest(".board-icon, sticky-icon"),
        isResize = event.target.closest(".resize-manager, .options-pane__option canvas, items-gallery__nav > div");

    if (!isResize && !isIcon) {
      this.set("selectedItem", null);
    }
  },

  init() {
    this._super();
    this.boardService.initBoard();
    this.shirts = {
      front: {
        icons: [],
        translateX: 0
      },
      back: {
        icons: [],
        translateX: 200
      },
      side: {
        icons: [],
        translateX: 400
      }
    };

    this.set("sizeDictionary", {
      S: 0.9,
      M: 1,
      L: 1.1,
      XL: 1.2
    });

    document.addEventListener("mousedown", this.documentClickHandler.bind(this));
  },

  didInsertElement() {
    let drawingBoardClientRect = this.element.getBoundingClientRect();
    this.set("boardOffset", {
      left: drawingBoardClientRect.left,
      top: drawingBoardClientRect.top
    });

    let svg = this.element.getElementsByTagName("svg");
    this.saveDrawingboardSvg(svg);
  },

  actions: {
    iconSelected: function(icon) {
      this.set("selectedItem", icon);
    },

    resizeEnd: function(position) {
      this.selectedItem.updatePosition(position);
    },

    iconMove: function(icon) {
      if (this.selectedItem !== icon) {
        return;
      }

      this.set("selectedItem", null);
      this.set("selectedItem", icon);
    },

    removeIcon: function(icon) {
      if (this.selectedItem === icon) {
        this.set("selectedItem", null);
      }

      this.boardService.removeIcon(icon);
    },

    replaceIconParent: function(icon, newParent) {
      let isSelected = Boolean(this.selectedItem);
      this.boardService.addIcon({
        parentId: newParent,
        icon: icon.icon,
        color: icon.color,
        position: {
          x: icon.position.x,
          y: icon.position.y
        },
        width: icon.width,
        height: icon.height,
        selected: isSelected
      });
    }
  }
});
