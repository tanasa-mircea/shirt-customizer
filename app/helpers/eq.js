import { helper } from '@ember/component/helper';

export function eq(params/*, hash*/) {
  return (params.get(0) === params.get(1));
}

export default helper(eq);
