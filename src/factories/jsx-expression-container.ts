import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('jsx-expression-container', (props) => {
  const { children } = props;

  if (
    !t.isNode(children) ||
    (!t.isJSXEmptyExpression(children) && !t.isExpression(children))
  ) {
    throw new Error(
      `The children of JsxExpressionContainer must be JSXEmptyExpression or Expression, got ${getType(
        children
      )}`
    );
  }

  return t.jsxExpressionContainer(children);
});
