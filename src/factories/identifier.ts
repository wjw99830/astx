import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('identifier', (props) => {
  const { children } = props;
  return t.identifier(children);
});
