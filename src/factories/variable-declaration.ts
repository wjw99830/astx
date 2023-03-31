import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('variable-declaration', (props) => {
  const { children, kind } = props;
  return t.variableDeclaration(
    kind,
    Array.isArray(children) ? children : [children]
  );
});
