import { ScopeShape } from './scope-shape';
import { ScopeValidator } from './scope-validator';
import { ERROR, Result } from '../util';

export class Scope<T extends ScopeShape> {
  private readonly name: string;

  private ScopeShapeClass: { new (): T };

  private validator: ScopeValidator<T>;

  constructor(ScopeShapeClass: { new (): T }, name: string) {
    this.name = name;
    this.ScopeShapeClass = ScopeShapeClass;

    this.validator = new ScopeValidator(ScopeShapeClass);
  }

  validate(comparisonScope?: Scope<T>): Result<void> {
    if (!comparisonScope) {
      return this.validator.validate(this.name);
    }

    // 서로 비교
    return ERROR('not implemented');
  }
}

export default {
  Scope,
};

/*
koa-scope-validator

type KoaMiddleware = (
  ctx: unknown,
  next: (...args: unknown[]) => unknown
) => unknown;

type ScopeType = ((ctx: any) => string) | string;

function createMiddleware(
  scopeShape: { new (): ScopeShape },
  requiredScope: ScopeType, // create:client
  givenScope: ScopeType, // 실제로 사용자가 가진 스코프
  errorHandler: (ctx: unknown, error: Error) => void = () => {}
): KoaMiddleware {
  return async (ctx, next) => {
    try {
      const builder = new ScopeBuilder(scopeShape);

      await next();
    } catch (err) {
      errorHandler(ctx, err);
    }
  };
}

createMiddleware(
  ScopeShape,
  'create:client:all',
  (ctx: any) => ctx.scope as string
);
*/
