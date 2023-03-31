import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-element', (props) => {
  const { children } = props;

  const openingElement = Array.isArray(children)
    ? (children.find((it) => t.isJSXOpeningElement(it)) as
        | t.JSXOpeningElement
        | undefined)
    : children;

  const closingElement = Array.isArray(children)
    ? (children?.find((it) => it?.type === 'JSXClosingElement') as
        | t.JSXClosingElement
        | undefined)
    : null;

  if (!openingElement) {
    throw new Error('jsx-element required a jsx-opening-element as child');
  }

  return t.jsxElement(
    openingElement,
    closingElement,
    Array.isArray(children)
      ? (children.filter(
          (it) => it !== openingElement && it !== closingElement
        ) as t.JSXElement['children'])
      : []
    /**
     * `selfClosing` doesn't work in builder `jsxElement`.
     * It will be removed in Babel 8.
     *
     * @see Issue https://github.com/babel/babel/issues/14460
     * @see PR https://github.com/babel/babel/pull/14464
     */
  );
});
