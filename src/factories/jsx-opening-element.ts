import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-opening-element', (props) => {
  const { children, attributes = [], selfClosing } = props;
  return t.jsxOpeningElement(children, attributes, selfClosing);
});
