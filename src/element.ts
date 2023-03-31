import * as t from '@babel/types';

type ExtractArrayItem<A> = A extends (infer I)[] ? I : never;

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      children?: t.Node | t.Node[] | undefined | null | string;
    }

    /**
     * Escape the fucking type checking for the JSX result type, because it's
     * not possible to retrieve type information about the element, attribut-
     * es or children of the JSX from this interface.
     * @see https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-result-type
     */
    type Element = any;

    type ProgramChild =
      | ExtractArrayItem<t.Program['body']>
      | t.Directive
      | t.InterpreterDirective;

    type CallExpressionChild =
      | t.CallExpression['callee']
      | ExtractArrayItem<t.CallExpression['arguments']>;

    interface IntrinsicElements {
      program: {
        sourceType?: t.Program['sourceType'];
        children: ProgramChild[] | ProgramChild;
      };
      'if-statement': {
        children: [
          t.IfStatement['test'],
          t.BlockStatement | t.ExpressionStatement,
          (t.IfStatement | t.BlockStatement | t.ExpressionStatement)?
        ];
      };
      'block-statement': {
        directives?: t.BlockStatement['directives'];
        children:
          | t.BlockStatement['body']
          | ExtractArrayItem<t.BlockStatement['body']>;
      };
      'expression-statement': {
        children: t.Expression;
      };
      'break-statement': {
        children?: t.BreakStatement['label'];
      };

      'call-expression': {
        children: CallExpressionChild[] | CallExpressionChild;
      };

      'variable-declaration': {
        kind: t.VariableDeclaration['kind'];
        children: t.VariableDeclarator | t.VariableDeclarator[];
      };
      'variable-declarator': {
        children: [t.VariableDeclarator['id'], t.VariableDeclarator['init']];
      };
      identifier: {
        children: string;
      };
      'array-expression': {
        children?:
          | Array<null | t.Expression | t.SpreadElement>
          | null
          | t.Expression
          | t.SpreadElement;
      };
      'spread-element': {
        children: t.Expression;
      };
      'assignment-expression': {
        operator: t.AssignmentExpression['operator'];
        left: t.AssignmentExpression['left'];
        right: t.AssignmentExpression['right'];
      };
      'binary-expression': {
        operator: t.BinaryExpression['operator'];
        children: [t.BinaryExpression['left'], t.BinaryExpression['right']];
      };
      'interpreter-directive': {
        children: t.InterpreterDirective['value'];
      };
      directive: {
        children: t.Directive['value'];
      };
      'directive-literal': {
        children: t.DirectiveLiteral['value'];
      };
      'jsx-element': {
        children?:
          | (
              | t.JSXOpeningElement
              | t.JSXClosingElement
              | ExtractArrayItem<t.JSXElement['children']>
            )[]
          | t.JSXOpeningElement;
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
        children: t.JSXOpeningElement['name'];
        selfClosing?: boolean;
        attributes?: t.JSXOpeningElement['attributes'];
      };
      'jsx-closing-element': {
        children: t.JSXClosingElement['name'];
      };
      'jsx-identifier': {
        children: string;
      };
      'jsx-attribute': {
        name: t.JSXAttribute['name'];
        children: t.JSXAttribute['value'];
      };
      'jsx-expression-container': {
        children: t.JSXExpressionContainer['expression'];
      };
      'jsx-text': {
        children: t.JSXText['value'];
      };
      'string-literal': {
        children?: t.StringLiteral['value'];
      };
      'numeric-literal': {
        children: string;
      };
    }
  }
}

export type Component<P extends object = object> = (props: P) => t.Node;
