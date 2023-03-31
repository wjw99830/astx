import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-expression-container', (props) => {
  const { children } = props;
  return t.jsxExpressionContainer(children);
});
