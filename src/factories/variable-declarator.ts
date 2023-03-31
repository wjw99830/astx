import * as t from '@babel/types';
import { Registry } from '../registry';

Registry.register('variable-declarator', (props) => {
  const {
    children: [id, expr],
  } = props;
  return t.variableDeclarator(id, expr);
});
