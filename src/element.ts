import * as t from '@babel/types';

type Child = t.Node | t.Node | undefined | null | string | boolean | number;
type IntrinsicElementsWithBaseProps<T extends Record<string, object>> = {
  [K in keyof T]: WithChildren<T[K]> & Attributes;
};
interface Attributes {
  attach?: Attach;
}

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      children: {};
    }

    /**
     * @see https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-result-type
     */
    type Element = t.Node;

    interface IntrinsicAttributes extends Attributes {}

    type IntrinsicElements = IntrinsicElementsWithBaseProps<{
      program: {
        sourceType?: t.Program['sourceType'];
      };
      'if-statement': {};
      'block-statement': {};
      'expression-statement': {};
      'call-expression': {};
      'variable-declaration': {
        kind: t.VariableDeclaration['kind'];
      };
      'variable-declarator': {};
      identifier: {};
      'spread-element': {};
      'binary-expression': {
        operator: t.BinaryExpression['operator'];
      };
      'jsx-element': {
        /**
         * This parameter doesn't work in builder `jsxElement`.
         * It will be removed in Babel 8.
         *
         * @see Issue https://github.com/babel/babel/issues/14460
         * @see PR https://github.com/babel/babel/pull/14464
         */
        // selfClosing?: boolean;
      };
      'jsx-opening-element': {
        selfClosing?: boolean;
      };
      'jsx-closing-element': {};
      'jsx-identifier': {};
      'jsx-attribute': {};
      'jsx-expression-container': {};
      'jsx-text': {};
      'string-literal': {};
      'numeric-literal': {};
    }>;
  }
}

export type Attach =
  | 'left'
  | 'right'
  | 'callee'
  | 'argument'
  | 'consequent'
  | 'alternate'
  | 'id'
  | 'init';
export type Children = (Child | Children)[] | Child;
export type WithChildren<T extends object> = {
  children?: Children;
} & T;
export type Component<P extends {} = {}> = (props: WithChildren<P>) => t.Node;
