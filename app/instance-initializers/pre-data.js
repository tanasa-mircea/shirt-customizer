export function initialize(container) {
  let objectHolderComponent = container.lookup("component:object-holder");
  console.log("container.defaultSize", container.get("application.defaultSize"));
  objectHolderComponent.updateSize();
}

export default {
  initialize
};
