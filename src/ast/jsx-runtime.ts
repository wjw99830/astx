import * as t from '@babel/types';

export function jsx<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  props: JSX.IntrinsicElements[T]
) {
  switch (tag) {
    case 'variable-declaration': {
      const _props = props as JSX.IntrinsicElements['variable-declaration'];
      return t.variableDeclaration(_props.kind, [
        _props.children as t.VariableDeclarator,
      ]);
    }
    case 'variable-declarator': {
      const _props = props as JSX.IntrinsicElements['variable-declarator'];
      return t.variableDeclarator(_props.id, _props.children);
    }
    case 'identifier': {
      const _props = props as JSX.IntrinsicElements['identifier'];
      return t.identifier(_props.children);
    }
    case 'array-expression': {
      const _props = props as JSX.IntrinsicElements['array-expression'];
      if (typeof _props.children === 'undefined') {
        return t.arrayExpression();
      } else {
        return t.arrayExpression([
          _props.children as null | t.Expression | t.SpreadElement,
        ]);
      }
    }
    case 'spread-element': {
      const _props = props as JSX.IntrinsicElements['spread-element'];
      return t.spreadElement(_props.children);
    }
    case 'assignment-expression': {
      const _props = props as JSX.IntrinsicElements['assignment-expression'];
      return t.assignmentExpression(_props.operator, _props.left, _props.right);
    }
    case 'assignment-expression': {
      const _props = props as JSX.IntrinsicElements['binary-expression'];
      return t.binaryExpression(_props.operator, _props.left, _props.right);
    }
    case 'interpreter-directive': {
      const _props = props as JSX.IntrinsicElements['interpreter-directive'];
      return t.interpreterDirective(_props.children);
    }
    case 'directive': {
      const _props = props as JSX.IntrinsicElements['directive'];
      return t.directive(_props.children);
    }
    case 'directive-literal': {
      const _props = props as JSX.IntrinsicElements['directive-literal'];
      return t.directiveLiteral(_props.children);
    }
    case 'block-statement': {
      const _props = props as JSX.IntrinsicElements['block-statement'];
      return t.blockStatement(
        [_props.children as ExtractArrayItem<t.BlockStatement['body']>],
        _props.directives
      );
    }
    case 'break-statement': {
      const _props = props as JSX.IntrinsicElements['break-statement'];
      return t.breakStatement(_props.children);
    }
  }
}

export function jsxs<T extends keyof JSX.IntrinsicElements>(
  tag: T,
  props: JSX.IntrinsicElements[T]
) {
  switch (tag) {
    case 'variable-declaration': {
      const _props = props as JSX.IntrinsicElements['variable-declaration'];
      return t.variableDeclaration(
        _props.kind,
        _props.children as t.VariableDeclarator[]
      );
    }
    case 'array-expression': {
      const _props = props as JSX.IntrinsicElements['array-expression'];
      return t.arrayExpression(
        _props.children as Array<null | t.Expression | t.SpreadElement>
      );
    }
    case 'block-statement': {
      const _props = props as JSX.IntrinsicElements['block-statement'];
      return t.blockStatement(
        _props.children as t.BlockStatement['body'],
        _props.directives
      );
    }
    default: {
      throw new TypeError(
        `This tag(${tag}) is not implemented when children is an array.`
      );
    }
  }
}

export type ExtractArrayItem<A> = A extends (infer I)[] ? I : never;

export declare namespace JSX {
  interface ElementChildrenAttribute {
    children: any;
  }

  /**
   * Escape the fucking type checking for the JSX result type, because it's
   * not possible to retrieve type information about the element, attribut-
   * es or children of the JSX from this interface.
   * @see https://www.typescriptlang.org/docs/handbook/jsx.html#the-jsx-result-type
   */
  type Element = any;

  interface IntrinsicElements {
    'variable-declaration': {
      kind: t.VariableDeclaration['kind'];
      children: t.VariableDeclarator | t.VariableDeclarator[];
    };
    'variable-declarator': {
      id: t.VariableDeclarator['id'];
      children?: t.VariableDeclarator['init'];
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
      left: t.BinaryExpression['left'];
      right: t.BinaryExpression['right'];
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
    'block-statement': {
      directives?: t.BlockStatement['directives'];
      children:
        | t.BlockStatement['body']
        | ExtractArrayItem<t.BlockStatement['body']>;
    };
    'break-statement': {
      children?: t.BreakStatement['label'];
    };
  }
}
