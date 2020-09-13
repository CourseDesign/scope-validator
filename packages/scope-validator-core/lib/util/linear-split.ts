export function linearSplit(
  name: string,
  divider: (position: number) => string
): string[] {
  const result = [];

  let body = name;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const div = divider(result.length);
    const [value, ...rest] = body.split(div);

    result.push(value);
    body = rest.join(div);

    if (!rest || rest.length === 0) break;
  }

  return result;
}

export default {
  split: linearSplit,
};
