# astx

Write AST by JSX.

## Usage

```tsx
import g from '@babel/generator';

export const variableDeclaration = (
  <variable-declaration kind="const">
    <variable-declarator id={<identifier>variableDeclaration</identifier>}>
      <jsx-element
        openingElement={
          <jsx-opening-element
            attributes={[
              <jsx-attribute name={<jsx-identifier>kind</jsx-identifier>}>
                <string-literal>const</string-literal>
              </jsx-attribute>,
            ]}
          >
            <jsx-identifier>variable-declaration</jsx-identifier>
          </jsx-opening-element>
        }
        closeingElement={
          <jsx-closing-element>
            <jsx-identifier>variable-declaration</jsx-identifier>
          </jsx-closing-element>
        }
      >
        <jsx-element
          openingElement={
            <jsx-opening-element
              attributes={[
                <jsx-attribute name={<jsx-identifier>id</jsx-identifier>}>
                  <jsx-expression-container>
                    <jsx-element
                      openingElement={
                        <jsx-opening-element>
                          <jsx-identifier>identifier</jsx-identifier>
                        </jsx-opening-element>
                      }
                      closeingElement={
                        <jsx-closing-element>
                          <jsx-identifier>identifier</jsx-identifier>
                        </jsx-closing-element>
                      }
                    >
                      <jsx-text>variableDeclaration</jsx-text>
                    </jsx-element>
                  </jsx-expression-container>
                </jsx-attribute>,
              ]}
            >
              <jsx-identifier>variable-declarator</jsx-identifier>
            </jsx-opening-element>
          }
          closeingElement={
            <jsx-closing-element>
              <jsx-identifier>variable-declarator</jsx-identifier>
            </jsx-closing-element>
          }
        ></jsx-element>
      </jsx-element>
    </variable-declarator>
  </variable-declaration>
);

console.log(g(variableDeclaration).code);
// The formatted output:
// const variableDeclaration = (
//   <variable-declaration kind="const">
//     <variable-declarator
//       id={<identifier>variableDeclaration</identifier>}
//     ></variable-declarator>
//   </variable-declaration>
// );
```
