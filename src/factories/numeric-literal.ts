import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('numeric-literal', (props) => {
  const { children } = props;
  const value = Number(children);

  if (isNaN(value)) {
    throw new Error(
      `numeric-literal requires the numeric string as child, but accepted '${children}'`
    );
  }
  return t.numericLiteral(Number(children));
});
