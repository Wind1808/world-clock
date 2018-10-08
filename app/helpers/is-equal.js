import { helper } from '@ember/component/helper';

export function isEqual([leftSide, rightSide]/*, hash*/) {
  return leftSide === rightSide;
}

export default helper(isEqual);
