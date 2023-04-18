import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType, toArray } from '../utils';

Registry.register('jsx-element', (props) => {
  const children = toArray(props.children);
  const openingElement = children.find(
    (it) => t.isNode(it) && t.isJSXOpeningElement(it)
  );
  const closingElement = children.find(
    (it) => t.isNode(it) && t.isJSXClosingElement(it)
  );

  const jsxChildren = children.filter(
    (it) =>
      t.isNode(it) &&
      (t.isJSXText(it) ||
        t.isJSXExpressionContainer(it) ||
        t.isJSXSpreadChild(it) ||
        t.isJSXElement(it) ||
        t.isJSXFragment(it))
  );

  if (!t.isNode(openingElement) || !t.isJSXOpeningElement(openingElement)) {
    throw new Error(
      `The openingElement of JSXAttribute must be JSXOpeningElement, got ${getType(
        openingElement
      )}`
    );
  }

  for (const it of jsxChildren) {
    if (
      !t.isNode(it) ||
      (!t.isJSXText(it) &&
        !t.isJSXExpressionContainer(it) &&
        !t.isJSXSpreadChild(it) &&
        !t.isJSXElement(it) &&
        !t.isJSXFragment(it))
    ) {
      throw new Error(
        `The children of JSXElement must be JSXText, JSXExpressionContainer, JSXSpreadChild, JSXElement or JSXFragment, got ${getType(
          it
        )}`
      );
    }
  }

  return t.jsxElement(
    openingElement,
    closingElement as t.JSXElement['closingElement'],
    jsxChildren as t.JSXElement['children']
    /**
     * `selfClosing` doesn't work in builder `jsxElement`.
     * It will be removed in Babel 8.
     *
     * @see Issue https://github.com/babel/babel/issues/14460
     * @see PR https://github.com/babel/babel/pull/14464
     */
  );
});
