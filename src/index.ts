import './factories';
import * as t from '@babel/types';
import { Registry } from './registry';
import { Component, WithChildren } from './element';
import { attach, toArray } from './utils';

export function jsx<T extends keyof JSX.IntrinsicElements | Component>(
  tag: T,
  props: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends Component<infer P>
    ? WithChildren<P> & JSX.IntrinsicAttributes
    : never
): t.Node {
  if (typeof tag === 'string') {
    return Registry.build(tag, props);
  }

  const node = tag(props);
  if (props.attach) {
    attach(node, props.attach);
  }
  return node;
}

export function jsxs<T extends keyof JSX.IntrinsicElements | Component>(
  tag: T,
  props: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends Component<infer P>
    ? WithChildren<P> & JSX.IntrinsicAttributes
    : never
): t.Node {
  if (typeof tag === 'string') {
    return Registry.build(tag, props);
  }

  const node = tag(props);
  if (props.attach) {
    const children = toArray(props.children);
    for (const it of children) {
      if (t.isNode(it)) {
        attach(it, props.attach);
      }
    }
  }
  return node;
}

export function Fragment(props: WithChildren<JSX.IntrinsicAttributes>) {
  if (props.attach) {
    const children = toArray(props.children);
    for (const it of children) {
      if (t.isNode(it)) {
        attach(it, props.attach);
      }
    }
  }

  return props.children; // hack fucking type;
}

export * from './element';
