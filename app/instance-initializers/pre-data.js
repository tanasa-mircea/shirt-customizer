export function initialize(container) {
  let iconsService = container.lookup("service:icons");
  let preloadedIcons = container.get("application.preloadedIcons");
  iconsService.updateIcons(preloadedIcons);
}

export default {
  initialize
};