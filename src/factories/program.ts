import * as t from '@babel/types';
import { Registry } from '../registry';
import { toArray } from './utils';

Registry.register('program', (props) => {
  const { sourceType } = props;
  const children = toArray(props.children);

  const interpreterDirective = children.find((it) =>
    t.isInterpreterDirective(it)
  ) as t.InterpreterDirective | undefined;

  const directives = children.filter((it) =>
    t.isDirective(it)
  ) as t.Directive[];

  const body = children.filter(
    (it) => !t.isDirective(it) && !t.isInterpreterDirective(it)
  ) as t.Program['body'];

  return t.program(body, directives, sourceType, interpreterDirective);
});
