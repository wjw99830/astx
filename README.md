# ast.jsx

Write AST by JSX.

## Usage

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "ast.jsx"
  }
}
```

```tsx
// demo.tsx
import g from '@babel/generator';
import * as t from '@babel/types';
import { format } from 'prettier';
import { Children, WithChildren } from '../../jsx-runtime';

console.log('matrioshka');
const metrioshka = (
  <variable-declaration kind="const">
    <variable-declarator>
      <identifier attach="id">variableDeclaration</identifier>
      <JSXElement
        attach="init"
        tag="variable-declaration"
        attributes={{ kind: 'const' }}
      >
        <JSXElement tag="variable-declarator">
          <JSXElement tag="identifier">variableDeclaration</JSXElement>
        </JSXElement>
      </JSXElement>
    </variable-declarator>
  </variable-declaration>
);
print(metrioshka, true);

console.log('variable declaration');
const variableDeclarations = (
  <>
    <variable-declaration kind="const">
      <variable-declarator>
        <identifier attach="id">a</identifier>
        <numeric-literal attach="init">1</numeric-literal>
      </variable-declarator>
    </variable-declaration>

    <variable-declaration kind="const">
      <variable-declarator>
        <identifier attach="id">b</identifier>
        <numeric-literal attach="init">2</numeric-literal>
      </variable-declarator>
    </variable-declaration>
  </>
);
print(<program>{variableDeclarations}</program>);

console.log('binary expression');
const binaryExpression = (
  <binary-expression operator="===">
    <binary-expression attach="left" operator="+">
      <identifier attach="left">a</identifier>
      <identifier attach="right">b</identifier>
    </binary-expression>
    <numeric-literal attach="right">3</numeric-literal>
  </binary-expression>
);
print(binaryExpression);

console.log('call expression');
const callExpression = (
  <call-expression>
    <identifier attach="callee">doSomething</identifier>
    <identifier attach="argument">a</identifier>
  </call-expression>
);
print(callExpression);

console.log('if statement');
print(
  <program>
    <if-statement>
      {binaryExpression}
      <block-statement attach="consequent">
        <expression-statement>{callExpression}</expression-statement>
      </block-statement>
      <block-statement attach="alternate">
        <expression-statement>
          <call-expression>
            <identifier attach="callee">doSomething</identifier>
          </call-expression>
        </expression-statement>
      </block-statement>
    </if-statement>
  </program>
);

interface IJSXElementProps {
  tag: string;
  attributes?: Record<string, string | true | t.Expression>;
  selfClosing?: boolean;
}

function JSXElement(props: WithChildren<IJSXElementProps>) {
  const attributes = Object.entries(props.attributes || {}).map(
    ([key, value]) => {
      let valueNode: Children;
      if (value === true) {
        valueNode = null;
      } else if (typeof value === 'string') {
        valueNode = <string-literal>{value}</string-literal>;
      } else {
        valueNode = (
          <jsx-expression-container>{value}</jsx-expression-container>
        );
      }
      return (
        <jsx-attribute>
          <jsx-identifier>{key}</jsx-identifier>
          {valueNode}
        </jsx-attribute>
      );
    }
  );
  if (typeof props.children === 'string') {
    // `<JSXElement tag="div">some text</JSXElement>` transpiled to `<div>some text</div>`
    return (
      <jsx-element>
        <jsx-opening-element>
          <jsx-identifier>{props.tag}</jsx-identifier>
          {attributes}
        </jsx-opening-element>
        <jsx-text>{props.children}</jsx-text>
        <jsx-closing-element>
          <jsx-identifier>{props.tag}</jsx-identifier>
        </jsx-closing-element>
      </jsx-element>
    );
  }

  if (!props.children) {
    return (
      // `<JSXElement tag="div"></JSXElement>` transpiled to `<div></div>` or `<div />` according to prop `selfClosing`
      <jsx-element>
        <jsx-opening-element selfClosing={props.selfClosing}>
          {attributes}
          <jsx-identifier>{props.tag}</jsx-identifier>
        </jsx-opening-element>
        {props.selfClosing ? null : (
          <jsx-closing-element>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-closing-element>
        )}
      </jsx-element>
    );
  }

  return (
    <jsx-element>
      <jsx-opening-element>
        {attributes}
        <jsx-identifier>{props.tag}</jsx-identifier>
      </jsx-opening-element>
      {props.children}
      <jsx-closing-element>
        <jsx-identifier>{props.tag}</jsx-identifier>
      </jsx-closing-element>
    </jsx-element>
  );
}

function print(node: any, formatted?: boolean) {
  const { code } = g(node);
  console.log(formatted ? format(code, { parser: 'babel' }) : code);
  console.log('');
}
```
