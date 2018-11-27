import Component from "@ember/component";
import {
  computed
} from "@ember/object";
import {
  inject as service
} from "@ember/service";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";

export default Component.extend({
  options: null,
  iconsService: service("icons"),
  sanitizedIcon: computed("options.icon", function() {
    return new HtmlSafe(this.iconsService.get(this.options.icon));
  })
});
