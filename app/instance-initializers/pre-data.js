export function initialize(container) {
  let component = container.lookup('component:object-holder');
  console.log('compoennt ', component)
  // component.set('size', 1);
  component.size = 'M';

}

export default {
  initialize
};
