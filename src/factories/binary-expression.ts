import * as t from '@babel/types';
import { Registry } from '../registry';
import { attached, getType, toArray } from '../utils';

Registry.register('binary-expression', (props) => {
  const { operator } = props;
  const children = toArray(props.children);
  const left = children.find((it) => t.isNode(it) && attached(it, 'left'));
  const right = children.find((it) => t.isNode(it) && attached(it, 'right'));

  if (!t.isNode(left) || (!t.isExpression(left) && !t.isPrivateName(left))) {
    throw new Error(
      `The left of BinaryExpression must be Expression or PrivateName, got ${getType(
        left
      )}`
    );
  }

  if (!t.isNode(right) || !t.isExpression(right)) {
    throw new Error(
      `The right of BinaryExpression must be Expression, got ${getType(right)}`
    );
  }

  return t.binaryExpression(operator, left, right);
});
