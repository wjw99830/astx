import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType, toArray } from '../utils';

Registry.register('jsx-opening-element', (props) => {
  const { selfClosing } = props;
  const children = toArray(props.children);
  const name = children.find(
    (it) =>
      t.isNode(it) &&
      (t.isJSXIdentifier(it) ||
        t.isJSXNamespacedName(it) ||
        t.isJSXMemberExpression(it))
  );
  const attributes = children.filter(
    (it) => t.isNode(it) && (t.isJSXAttribute(it) || t.isJSXSpreadAttribute(it))
  );

  if (
    !t.isNode(name) ||
    (!t.isJSXIdentifier(name) &&
      !t.isJSXNamespacedName(name) &&
      !t.isJSXMemberExpression(name))
  ) {
    throw new Error(
      `The name of JSXOpeningElement must be JSXIdentifier, JSXNamespacedName or JSXMemberExpression, got ${getType(
        name
      )}`
    );
  }

  return t.jsxOpeningElement(
    name,
    attributes as t.JSXOpeningElement['attributes'],
    selfClosing
  );
});
