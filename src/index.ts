import * as t from '@babel/types';

export interface BaseNode {
  leadingComments: ReadonlyArray<t.Comment> | null;
  innerComments: ReadonlyArray<t.Comment> | null;
  trailingComments: ReadonlyArray<t.Comment> | null;
  start: number | null;
  end: number | null;
  loc: t.SourceLocation | null;
  type: t.Node['type'];
  range?: [number, number];
  extra?: Record<string, unknown>;
}

export type Component<P extends object = object> = (props: P) => BaseNode;

export function jsx<T extends keyof JSX.IntrinsicElements | Component>(
  tag: T,
  props: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends Component<infer P>
    ? P
    : never
) {
  if (typeof tag === 'string') {
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
        return t.assignmentExpression(
          _props.operator,
          _props.left,
          _props.right
        );
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
      case 'jsx-element': {
        const _props = props as JSX.IntrinsicElements['jsx-element'];
        return t.jsxElement(
          _props.openingElement,
          _props.closeingElement,
          _props.children
            ? [_props.children as ExtractArrayItem<t.JSXElement['children']>]
            : [],
          _props.selfClosing
        );
      }
      case 'jsx-opening-element': {
        const _props = props as JSX.IntrinsicElements['jsx-opening-element'];
        return t.jsxOpeningElement(
          _props.children,
          _props.attributes || [],
          _props.selfClosing
        );
      }
      case 'jsx-closing-element': {
        const _props = props as JSX.IntrinsicElements['jsx-closing-element'];
        return t.jsxClosingElement(_props.children);
      }
      case 'jsx-identifier': {
        const _props = props as JSX.IntrinsicElements['jsx-identifier'];
        return t.jsxIdentifier(_props.children);
      }
      case 'jsx-attribute': {
        const _props = props as JSX.IntrinsicElements['jsx-attribute'];
        return t.jsxAttribute(_props.name, _props.children);
      }
      case 'jsx-text': {
        const _props = props as JSX.IntrinsicElements['jsx-text'];
        return t.jsxText(_props.children);
      }
      case 'string-literal': {
        const _props = props as JSX.IntrinsicElements['string-literal'];
        return t.stringLiteral(_props.children || '');
      }
      case 'jsx-expression-container': {
        const _props =
          props as JSX.IntrinsicElements['jsx-expression-container'];
        return t.jsxExpressionContainer(_props.children);
      }
      default:
        throw new TypeError(`This tag(${tag}) is not implemented.`);
    }
  } else {
    return tag(props);
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
    'jsx-element': {
      openingElement: t.JSXElement['openingElement'];
      closeingElement?: t.JSXElement['closingElement'];
      children?:
        | t.JSXElement['children']
        | ExtractArrayItem<t.JSXElement['children']>;
      selfClosing?: boolean;
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
  }
}
