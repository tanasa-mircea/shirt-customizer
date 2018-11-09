import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';


export function sanitize(params) {
  return new htmlSafe(params.get(0));
}

export default helper(sanitize);
