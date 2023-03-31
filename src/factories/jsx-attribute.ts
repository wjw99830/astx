import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-attribute', (props) => {
  const { name, children } = props;
  return t.jsxAttribute(name, children);
});
