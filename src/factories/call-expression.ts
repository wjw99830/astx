import * as t from '@babel/types';
import { Registry } from '../registry';
import { toArray } from './utils';

Registry.register('call-expression', (props) => {
  const [callee, ..._arguments] = toArray(props.children);

  if (!t.isExpression(callee) && !t.isV8IntrinsicIdentifier(callee)) {
    throw new Error(
      `call-expression requires a expression or V8IntrinsicIdentifier at first child, but accepted ${callee.type}`
    );
  }

  return t.callExpression(callee, _arguments as t.CallExpression['arguments']);
});
