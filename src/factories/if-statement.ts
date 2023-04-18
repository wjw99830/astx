import * as t from '@babel/types';
import { Registry } from '../registry';
import { attached, getType, toArray } from '../utils';

Registry.register('if-statement', (props) => {
  const children = toArray(props.children);
  const test = children.find((it) => t.isNode(it) && t.isExpression(it));
  const consequent = children.find(
    (it) => t.isNode(it) && attached(it, 'consequent')
  );
  const alternate = children.find(
    (it) => t.isNode(it) && attached(it, 'alternate')
  );

  if (!t.isNode(test) || !t.isExpression(test)) {
    throw new Error(
      `The test of IfStatement must be Expression, got ${getType(test)}`
    );
  }

  if (!t.isNode(consequent) || !t.isStatement(consequent)) {
    throw new Error(
      `The consequent of IfStatement must be Statement, got ${getType(
        consequent
      )}`
    );
  }

  if (
    alternate != null &&
    (!t.isNode(alternate) || !t.isStatement(alternate))
  ) {
    throw new Error(
      `The alternate of IfStatement must be Statement or nullish, got ${getType(
        alternate
      )}`
    );
  }

  return t.ifStatement(test, consequent, alternate);
});
