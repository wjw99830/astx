import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('binary-expression', (props) => {
  const {
    operator,
    children: [left, right],
  } = props;
  return t.binaryExpression(operator, left, right);
});
