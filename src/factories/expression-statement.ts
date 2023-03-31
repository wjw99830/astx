import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('expression-statement', (props) => {
  const { children } = props;
  return t.expressionStatement(children);
});
