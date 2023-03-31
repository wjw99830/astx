import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('break-statement', (props) => {
  const { children } = props;
  return t.breakStatement(children);
});
