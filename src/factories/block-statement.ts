import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('block-statement', (props) => {
  const { children, directives } = props;
  return t.blockStatement(
    Array.isArray(children) ? children : [children],
    directives
  );
});
