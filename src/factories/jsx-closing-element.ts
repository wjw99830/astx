import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('jsx-closing-element', (props) => {
  const { children } = props;

  if (
    !t.isNode(children) ||
    (!t.isJSXIdentifier(children) &&
      !t.isJSXNamespacedName(children) &&
      !t.isJSXMemberExpression(children))
  ) {
    throw new Error(
      `The children of JSXClosingElement must be JSXIdentifier, JSXNamespacedName or JSXMemberExpression, got ${getType(
        children
      )}`
    );
  }

  return t.jsxClosingElement(children);
});
