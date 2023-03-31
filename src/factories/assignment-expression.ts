import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('assignment-expression', (props) => {
  const { operator, left, right } = props;
  return t.assignmentExpression(operator, left, right);
});
