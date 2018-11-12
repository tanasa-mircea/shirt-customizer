import { helper } from '@ember/component/helper';

export function gallerycond(params) {
  let currentIndex = params[0],
  currentPage = params[1],
  displayNumber = params[2];

  return currentIndex >= ((currentPage - 1) * displayNumber) && currentIndex < (currentPage * displayNumber);
}

export default helper(gallerycond);
