import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-identifier', (props) => {
  const { children } = props;
  return t.jsxIdentifier(children);
});
