import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('expression-statement', (props) => {
  const { children } = props;

  if (!t.isNode(children) || !t.isExpression(children)) {
    throw new Error(
      `The children of ExpressionStatement must be Expression, got ${getType(
        children
      )}`
    );
  }

  return t.expressionStatement(children);
});
