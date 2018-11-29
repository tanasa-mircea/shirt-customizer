import $ from "jquery";

var loadIcons = function() {
  return $.getJSON("/data/icons.json");
};

export function initialize(application) {
  return new Promise(function(resolve, reject) {
    application.deferReadiness();
    loadIcons()
      .then(function(icons) {
        application.set("preloadedIcons", icons);
        application.advanceReadiness();
        resolve();
      })
      .catch(function(err) {
        reject(err);
      });
  });
}

export default {
  initialize
};