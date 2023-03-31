import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('if-statement', (props) => {
  const {
    children: [test, consequent, alternate],
  } = props;
  return t.ifStatement(test, consequent, alternate);
});
