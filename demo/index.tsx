import g from '@babel/generator';
import * as t from '@babel/types';
import { format } from 'prettier';

console.log('matrioshka');
print(
  <variable-declaration kind="const">
    <variable-declarator>
      <identifier>variableDeclaration</identifier>
      <JSXElement tag="variable-declaration" attributes={{ kind: 'const' }}>
        <JSXElement tag="variable-declarator">
          <JSXElement tag="identifier">variableDeclaration</JSXElement>
        </JSXElement>
      </JSXElement>
    </variable-declarator>
  </variable-declaration>,
  true
);

console.log('variable declaration');
const variableDeclarations = (
  <>
    <variable-declaration kind="const">
      <variable-declarator>
        <identifier>a</identifier>
        <numeric-literal>1</numeric-literal>
      </variable-declarator>
    </variable-declaration>

    <variable-declaration kind="const">
      <variable-declarator>
        <identifier>b</identifier>
        <numeric-literal>2</numeric-literal>
      </variable-declarator>
    </variable-declaration>
  </>
);
print(<program>{variableDeclarations}</program>);

console.log('binary expression');
const binaryExpression = (
  <binary-expression operator="===">
    <binary-expression operator="+">
      <identifier>a</identifier>
      <identifier>b</identifier>
    </binary-expression>
    <numeric-literal>3</numeric-literal>
  </binary-expression>
);
print(binaryExpression);

console.log('call expression');
const callExpression = (
  <call-expression>
    <identifier>doSomething</identifier>
    <identifier>a</identifier>
  </call-expression>
);
print(callExpression);

console.log('statement');
print(
  <program>
    <if-statement>
      {binaryExpression}
      <block-statement>
        <expression-statement>{callExpression}</expression-statement>
      </block-statement>
      <block-statement>
        <expression-statement>
          <call-expression>
            <identifier>doSomething</identifier>
          </call-expression>
        </expression-statement>
      </block-statement>
    </if-statement>
  </program>
);

function JSXElement(props: {
  tag: string;
  attributes?: Record<string, string | true | t.Expression>;
  children?: string | t.JSXElement;
  selfClosing?: boolean;
}) {
  const attributes = Object.entries(props.attributes || {}).map(
    ([key, value]) => {
      return (
        <jsx-attribute name={<jsx-identifier>{key}</jsx-identifier>}>
          {typeof value === 'string' ? (
            <string-literal>{value}</string-literal>
          ) : value === true ? null : (
            <jsx-expression-container>{value}</jsx-expression-container>
          )}
        </jsx-attribute>
      );
    }
  );
  if (typeof props.children === 'string') {
    // `<JSXElement tag="div">some text</JSXElement>` transpiled to `<div>some text</div>`
    return (
      <jsx-element>
        <jsx-opening-element attributes={attributes}>
          <jsx-identifier>{props.tag}</jsx-identifier>
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
        <jsx-opening-element
          selfClosing={props.selfClosing}
          attributes={attributes}
        >
          <jsx-identifier>{props.tag}</jsx-identifier>
        </jsx-opening-element>
      </jsx-element>
    );
  }

  return (
    <jsx-element>
      <jsx-opening-element attributes={attributes}>
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
