import { ScopeShape } from './scope-shape';
import { ERROR, OK, Result, linearSplit } from '../util';

export class ScopeValidator<T extends ScopeShape> {
  private scopeShape: T;

  private readonly ScopeShapeClass: { new (): T };

  constructor(ScopeShapeClass: { new (): T }) {
    this.scopeShape = new ScopeShapeClass();
    this.ScopeShapeClass = ScopeShapeClass;
  }

  validate(name: string): Result<void> {
    const names = linearSplit(name, this.scopeShape.divider.name);

    if (this.scopeShape.shapes.length < names.length) {
      return ERROR('Shape length is longer than expected');
    }

    names.length = this.scopeShape.shapes.length;
    const results: Result<void>[] = this.scopeShape.shapes.map(
      (shape, i): Result<void> => shape.validator.validate(names[i])
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
