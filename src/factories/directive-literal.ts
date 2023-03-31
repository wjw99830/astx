import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('directive-literal', (props) => {
  const { children } = props;
  return t.directiveLiteral(children);
});
