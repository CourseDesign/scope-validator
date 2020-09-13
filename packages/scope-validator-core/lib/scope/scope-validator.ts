// eslint-disable-next-line max-classes-per-file
import { ScopeShape } from './scope-shape';
import { OptionalShape, RequiredShape, VariableShape } from '../shape';
import { ERROR, OK, Result } from '../util/result';

function split(
  name: string,
  dividerName: (position: number) => string
): string[] {
  const result = [];

  let body = name;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const div = dividerName(result.length);
    const [value, ...rest] = body.split(div);

    if (!rest) break;

    result.push(value);
    body = rest.join(div);
  }

  return result;
}

export class ScopeValidator<T extends ScopeShape> {
  private scopeShape: T;

  private readonly ScopeShapeClass: { new (): T };

  constructor(ScopeShapeClass: { new (): T }) {
    this.scopeShape = new ScopeShapeClass();
    this.ScopeShapeClass = ScopeShapeClass;
  }

  validate(name: string): Result<void> {
    const names = split(name, this.scopeShape.divider.name);

    if (this.scopeShape.shapes.length < names.length) {
      return ERROR('Shape length is longer than expected');
    }

    names.length = this.scopeShape.shapes.length;
    const results: Result<void>[] = this.scopeShape.shapes.map(
      (shape, i): Result<void> => {
        if (shape instanceof RequiredShape)
          return this.validateRequiredShape(names[i], shape);
        if (shape instanceof OptionalShape)
          return this.validateOptionalShape(names[i], shape);
        if (shape instanceof VariableShape)
          return this.validateVariableShape(names[i], shape);

        return ERROR('illegal shape');
      }
    );

    for (const result of results) {
      if (!result.ok) return result;
    }

    return OK();
  }

  // eslint-disable-next-line class-methods-use-this
  private validateRequiredShape(
    name: string,
    shape: RequiredShape
  ): Result<void> {
    if (shape.regex.test(name)) {
      return ERROR(`${shape.name} is not valid`);
    }

    return OK();
  }

  // eslint-disable-next-line class-methods-use-this
  private validateOptionalShape(
    name: string | undefined,
    shape: OptionalShape
  ): Result<void> {
    if (name && shape.regex.test(name)) {
      return ERROR(`${shape.name} is not valid`);
    }

    return OK();
  }

  private validateVariableShape(
    name: string,
    shape: VariableShape
  ): Result<void> {
    const { divider } = shape;
    const names = split(name, divider.name);

    const results: Result<void>[] = names.map(
      (str): Result<void> => this.validateRequiredShape(str, shape)
    );

    for (const result of results) {
      if (!result.ok) return result;
    }

    return OK();
  }
}

export default {
  ScopeValidator,
};
