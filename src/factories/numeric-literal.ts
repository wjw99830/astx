import * as t from '@babel/types';
import { Registry } from '../registry';
import { getType } from '../utils';

Registry.register('numeric-literal', (props) => {
  const { children } = props;
  const value = Number(children);

  if (isNaN(value)) {
    const type = getType(children);
    throw new Error(
      `The children of NumericLiteral must be numeric string or number, got ${
        type === 'string' ? `'${children}'` : type
      }`
    );
  }

  return t.numericLiteral(value);
});
