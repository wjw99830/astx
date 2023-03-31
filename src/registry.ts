import * as t from '@babel/types';

export namespace Registry {
  type Builder<T = any> = (props: T) => t.Node;

  const factories: Record<string, Builder | undefined> = {};

  export function register<T extends keyof JSX.IntrinsicElements>(
    tag: T,
    factory: (props: JSX.IntrinsicElements[T]) => t.Node
  ) {
    if (!factories[tag]) {
      factories[tag] = factory;
    }
  }

  export function build<T extends keyof JSX.IntrinsicElements>(
    tag: T,
    props: JSX.IntrinsicElements[T]
  ) {
    const factory = factories[tag];

    if (!factory) {
      throw new Error(`unexpected tag(${tag}), missing factory`);
    }

    return factory(props);
  }
}
