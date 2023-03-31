import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('jsx-text', (props) => {
  const { children } = props;
  return t.jsxText(children);
});
