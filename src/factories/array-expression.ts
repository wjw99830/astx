import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('array-expression', (props) => {
  const { children } = props;

  if (typeof children === 'undefined') {
    // satisfy type checking
    return t.arrayExpression();
  }

  return t.arrayExpression(Array.isArray(children) ? children : [children]);
});
