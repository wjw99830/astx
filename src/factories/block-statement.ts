import * as t from '@babel/types';
import { Registry } from '../registry';
import { toArray } from '../utils';

Registry.register('block-statement', (props) => {
  const children = toArray(props.children);
  const directives = children.filter((it) => t.isNode(it) && t.isDirective(it));
  const body = children.filter((it) => t.isNode(it) && t.isStatement(it));

  return t.blockStatement(body as t.Statement[], directives as t.Directive[]);
});
