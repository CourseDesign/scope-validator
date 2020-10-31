import ScopeValidator from './scope-validator';

export default class ScopeValidatorManager<T> {
  private readonly scopeValidators: ScopeValidator<T>[] = [];

  constructor(...scopeValidators: ScopeValidator<T>[]) {
    this.use(...scopeValidators);
  }

  use(...scopeValidators: ScopeValidator<T>[]): void {
    this.scopeValidators.push(...scopeValidators);
  }

  async validateAsync(scope: string, context?: T): Promise<boolean>;
  async validateAsync(scopes: string[], context?: T): Promise<boolean[]>;

  async validateAsync(
    scope: string | string[],
    context?: T
  ): Promise<boolean | boolean[]> {
    if (scope instanceof Array) {
      return Promise.all(
        scope.map(async (one) => this.validateAsync(one, context))
      );
    }

    const matchValidators = this.scopeValidators.filter((validator) =>
      validator.canValidate(scope)
    );

    let result = true;
    await Promise.all(
      matchValidators.map(async (validator) => {
        const isCheck = await validator.validate(scope, {
          received: context,
          parameters: validator.pattern.getParameters(scope),
        });

        if (result && !isCheck) result = false;
      })
    );

    return matchValidators.length >= 1 && result;
  }

  validate(scope: string, context?: T): boolean;
  validate(scopes: string[], context?: T): boolean[];

  validate(scope: string | string[], context?: T): boolean | boolean[] {
    if (scope instanceof Array) {
      return scope.map((one) => this.validate(one, context));
    }

    const matchValidators = this.scopeValidators.filter((validator) =>
      validator.canValidate(scope)
    );

    return (
      matchValidators.length >= 1 &&
      matchValidators.every((validator) =>
        validator.validate(scope, {
          received: context,
          parameters: validator.pattern.getParameters(scope),
        })
      )
    );
  }
}
