import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('spread-element', (props) => {
  const { children } = props;
  return t.spreadElement(children);
});
