import * as t from '@babel/types';
import { Registry } from '../registry';
import { attached, getType, toArray } from '../utils';

Registry.register('variable-declarator', (props) => {
  const children = toArray(props.children);
  const id = children.find((it) => t.isNode(it) && attached(it, 'id'));
  const init = children.find((it) => t.isNode(it) && attached(it, 'init'));

  if (!t.isNode(id) || !t.isLVal(id)) {
    throw new Error(
      `The id of VariableDeclarator must be LVal, got ${getType(id)}`
    );
  }

  if (init != null && (!t.isNode(init) || !t.isExpression(init))) {
    throw new Error(
      `The init of VariableDeclarator must be Expression or nullish, got ${getType(
        init
      )}`
    );
  }
  return t.variableDeclarator(id, init);
});
