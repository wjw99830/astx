import g from '@babel/generator';
import * as t from '@babel/types';

export const variableDeclaration = (
  <variable-declaration kind="const">
    <variable-declarator id={<identifier>variableDeclaration</identifier>}>
      <PlainJSXElement
        tag="variable-declaration"
        attributes={{ kind: 'const' }}
      >
        <PlainJSXElement
          tag="variable-declarator"
          attributes={{
            id: (
              <PlainJSXElement tag="identifier">
                variableDeclaration
              </PlainJSXElement>
            ),
          }}
        />
      </PlainJSXElement>
    </variable-declarator>
  </variable-declaration>
);

console.log(g(variableDeclaration).code);
// const variableDeclaration = (
//   <variable-declaration kind="const">
//     <variable-declarator id={<identifier>variableDeclaration</identifier>} />
//   </variable-declaration>
// );

function PlainJSXElement(props: {
  tag: string;
  attributes?: Record<string, string | true | t.Expression>;
  children?: string | t.JSXElement;
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
    return (
      <jsx-element
        openingElement={
          <jsx-opening-element attributes={attributes}>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-opening-element>
        }
        closeingElement={
          <jsx-closing-element>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-closing-element>
        }
      >
        <jsx-text>{props.children}</jsx-text>
      </jsx-element>
    );
  } else if (!props.children) {
    return (
      <jsx-element
        openingElement={
          <jsx-opening-element selfClosing attributes={attributes}>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-opening-element>
        }
      ></jsx-element>
    );
  } else {
    return (
      <jsx-element
        openingElement={
          <jsx-opening-element attributes={attributes}>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-opening-element>
        }
        closeingElement={
          <jsx-closing-element>
            <jsx-identifier>{props.tag}</jsx-identifier>
          </jsx-closing-element>
        }
      >
        {props.children}
      </jsx-element>
    );
  }
}
