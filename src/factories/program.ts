import * as t from '@babel/types';
import { Registry } from '../registry';
import { toArray } from '../utils';

Registry.register('program', (props) => {
  const { sourceType } = props;
  const children = toArray(props.children);
  const interpreter = children.find(
    (it) => t.isNode(it) && t.isInterpreterDirective(it)
  );
  const directives = children.filter((it) => t.isNode(it) && t.isDirective(it));
  const body = children.filter((it) => t.isNode(it) && t.isStatement(it));

  return t.program(
    body as t.Program['body'],
    directives as t.Program['directives'],
    sourceType,
    interpreter as t.Program['interpreter']
  );
});
