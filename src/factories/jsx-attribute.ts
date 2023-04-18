import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType, toArray } from '../utils';

Registry.register('jsx-attribute', (props) => {
  const children = toArray(props.children);
  const name = children.find(
    (it) => t.isNode(it) && (t.isJSXIdentifier(it) || t.isJSXNamespacedName(it))
  );
  const value = children.find(
    (it) =>
      t.isNode(it) &&
      (t.isJSXElement(it) ||
        t.isJSXExpressionContainer(it) ||
        t.isJSXFragment(it) ||
        t.isStringLiteral(it))
  );

  if (
    !t.isNode(name) ||
    (!t.isJSXIdentifier(name) && !t.isJSXNamespacedName(name))
  ) {
    throw new Error(
      `The name of JSXAttribute must be JSXIdentifier or JSXNamespacedName, got ${getType(
        name
      )}`
    );
  }

  return t.jsxAttribute(name, value as t.JSXAttribute['value']);
});
