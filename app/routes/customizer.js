import Route from "@ember/routing/route";
import $ from "jquery";

export default Route.extend({
  model() {
    return Promise.all([
      $.getJSON("/data/shirts.json"),
      $.getJSON("/data/config.json")
    ]);
  }
});