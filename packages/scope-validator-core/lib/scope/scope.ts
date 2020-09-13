import { ScopeShape } from './scope-shape';
import { ScopeValidator } from './scope-validator';

export class Scope<T extends ScopeShape> {
  private readonly name: string;

  private ScopeShapeClass: { new (): T };

  private validator: ScopeValidator<T>;

  constructor(ScopeShapeClass: { new (): T }, name: string) {
    this.name = name;
    this.ScopeShapeClass = ScopeShapeClass;

    this.validator = new ScopeValidator(ScopeShapeClass);
  }

  validate(comparisonScope?: Scope<T>): void {
    if (!comparisonScope) {
      this.validator.validate(this.name);
    } else {
      // 서로비교
    }
  }
}

export default {
  Scope,
};

/*
const scope = new Scope(ScopeShape, 'name');

1. shape 확인
2. 요구하는 scope 확인.

const builder = new ScopeBuilder(TestScopeShape);

const scope1 = builder.build('create:user.username:self');
const scope2 = builder.build('create:test:self');

await scope1.validate(); // shape 가 맞는지 확인
await scope2.validate();
await scope1.validate(scope2);
*/

/*

const scope1 = new Scope(TestScopeShape, 'create:test:all')
const scope2 = new Scope(TestScopeShape, 'create:test:all')

await scope1.validate()
await scope2.validate()
await scope1.validate(scope2);

 */

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
