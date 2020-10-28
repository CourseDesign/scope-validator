import ScopeValidator from './scope-validator';

export default class ScopeValidatorManager<T> {
  private readonly scopeValidators: ScopeValidator<T>[] = [];

  constructor(...scopeValidators: ScopeValidator<T>[]) {
    this.use(...scopeValidators);
  }

  use(...scopeValidators: ScopeValidator<T>[]): void {
    this.scopeValidators.push(...scopeValidators);
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
