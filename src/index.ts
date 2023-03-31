import './factories';
import * as t from '@babel/types';
import { Registry } from './registry';
import { Component } from './element';

export function jsx<T extends keyof JSX.IntrinsicElements | Component>(
  tag: T,
  props: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends Component<infer P>
    ? P
    : never
): t.Node {
  if (typeof tag === 'string') {
    return Registry.build(tag, props);
  }

  return tag(props);
}

export function jsxs<T extends keyof JSX.IntrinsicElements | Component>(
  tag: T,
  props: T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T extends Component<infer P>
    ? P
    : never
): t.Node {
  if (typeof tag === 'string') {
    return Registry.build(tag, props);
  }

  return tag(props);
}

export function Fragment(props: JSX.ElementChildrenAttribute) {
  return props.children;
}
