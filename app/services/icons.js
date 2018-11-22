import Service from "@ember/service";

export default Service.extend({

  get(icon) {
    return this.icons[icon];
  },

  updateIcons(icons) {
    this.set("icons", icons);
  }
});
