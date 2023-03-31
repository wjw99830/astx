import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-closing-element', (props) => {
  const { children } = props;
  return t.jsxClosingElement(children);
});
