export function initialize(application) {
  application.deferReadiness();
  // this.iconsService.initData()
  application.advanceReadiness();
}

export default {
  initialize
};
