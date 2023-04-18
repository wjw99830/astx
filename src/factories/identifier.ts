import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('identifier', (props) => {
  const { children } = props;

  if (typeof children !== 'string') {
    throw new Error(
      `The children of Identifier must be string, got ${getType(children)}`
    );
  }

  return t.identifier(children);
});
