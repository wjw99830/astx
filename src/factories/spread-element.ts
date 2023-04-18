import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('spread-element', (props) => {
  const { children } = props;

  if (!(t.isNode(children) && t.isExpression(children))) {
    throw new Error(
      `The children of SpreadElement must be Expression, got ${getType(
        children
      )}`
    );
  }

  return t.spreadElement(children);
});
