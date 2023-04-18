import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('jsx-text', (props) => {
  const { children } = props;

  if (typeof children !== 'string') {
    throw new Error(
      `The children of JSXText must be string, got ${getType(children)}`
    );
  }

  return t.jsxText(children);
});
