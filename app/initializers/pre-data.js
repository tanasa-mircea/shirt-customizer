export function initialize(application) {
  application.deferReadiness();
  application.set("defaultSize", "L");
  application.advanceReadiness();
}

export default {
  initialize
};
