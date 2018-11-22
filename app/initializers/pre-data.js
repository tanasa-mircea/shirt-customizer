import $ from "jquery";

var loadIcons = function() {
  return $.getJSON("/data/icons.json");
};

export function initialize(application) {
  application.deferReadiness();
  loadIcons()
    .then(function(icons) {
      application.set("preloadedIcons", icons);
      application.advanceReadiness();
    });
}

export default {
  initialize
};
