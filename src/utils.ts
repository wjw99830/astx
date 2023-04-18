import * as t from '@babel/types';

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function getType(maybeNode: unknown) {
  if (t.isNode(maybeNode)) {
    return maybeNode.type;
  }

  return typeof maybeNode;
}

export function attach(node: t.Node, attach: string) {
  node.extra = {
    ...node.extra,
    attach,
  };
  return node;
}

export function attached(node: t.Node, attach: string) {
  return node.extra?.attach === attach;
}
