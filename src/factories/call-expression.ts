import * as t from '@babel/types';
import { Registry } from '../registry';
import { attached, getType, toArray } from '../utils';

Registry.register('call-expression', (props) => {
  const children = toArray(props.children);
  const callee = children.find((it) => t.isNode(it) && attached(it, 'callee'));
  const argumentz = children.filter(
    (it) => t.isNode(it) && attached(it, 'argument')
  );

  if (
    !t.isNode(callee) ||
    (!t.isV8IntrinsicIdentifier(callee) && !t.isExpression(callee))
  ) {
    throw new Error(
      `The callee of CallExpression must be V8IntrinsicIdentifier or Expression, got ${getType(
        callee
      )}`
    );
  }

  for (const it of argumentz) {
    if (
      !t.isNode(it) ||
      (!t.isArgumentPlaceholder(it) &&
        !t.isJSXNamespacedName(it) &&
        !t.isSpreadElement(it) &&
        !t.isExpression(it))
    ) {
      throw new Error(
        `The argument of CallExpression must be ArgumentPlaceholder, JSXNamespacedName, SpreadElement or Expression, got ${getType(
          it
        )}`
      );
    }
  }

  return t.callExpression(callee, argumentz as t.CallExpression['arguments']);
});
