import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('directive', (props) => {
  const { children } = props;
  return t.directive(children);
});
