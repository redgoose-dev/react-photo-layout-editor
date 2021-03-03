let props: any = {};

export function init(newProps: Function): void
{
  props = newProps;
}

export function run(key: string, value: unknown = null): void
{
  if (!key) return;
  if (props[key] && typeof props[key] === 'function')
  {
    props[key](value);
  }
}

export function getProps(): any
{
  return props;
}
