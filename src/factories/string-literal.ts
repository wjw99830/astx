import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('string-literal', (props) => {
  const { children } = props;
  return t.stringLiteral(children || '');
});
