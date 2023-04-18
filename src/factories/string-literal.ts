import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('string-literal', (props) => {
  const { children } = props;
  const value = children ?? '';

  if (typeof value !== 'string') {
    throw new Error(
      `The children of StringLiteral must be string or nullish, got ${getType(
        children
      )}`
    );
  }

  return t.stringLiteral(value);
});
