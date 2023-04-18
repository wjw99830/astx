import * as t from '@babel/types';
import { Registry } from '../registry';
import { toArray } from '../utils';

Registry.register('variable-declaration', (props) => {
  const { kind } = props;
  const children = toArray(props.children);
  const declarations = children.filter(
    (it) => t.isNode(it) && t.isVariableDeclarator(it)
  );

  return t.variableDeclaration(
    kind,
    declarations as t.VariableDeclaration['declarations']
  );
});
