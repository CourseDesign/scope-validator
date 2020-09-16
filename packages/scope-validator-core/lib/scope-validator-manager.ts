import ScopeValidator from './scope-validator';

export default class ScopeValidatorManager<T> {
  private readonly scopeValidators: ScopeValidator<T>[] = [];

  private context?: T;

  constructor(...scopeValidators: ScopeValidator<T>[]) {
    this.use(...scopeValidators);
  }

  use(...scopeValidators: ScopeValidator<T>[]): void {
    this.scopeValidators.push(...scopeValidators);
  }

  validateOne(scope: string): boolean {
    const matchValidators = this.scopeValidators.filter((validator) =>
      validator.test(scope)
    );

    return (
      matchValidators.length >= 1 &&
      matchValidators.every((validator) =>
        validator.validate(scope, {
          received: this.context,
          parameters: validator.pattern.getParameters(scope),
        })
      )
    );
  }

  validateMany(...scopes: string[]): boolean[] {
    return scopes.map((scope) => this.validateOne(scope));
  }

  validate(scope: string[], context?: T): boolean[] {
    this.setContext(context);

    return this.validateMany(...scope);
  }

  setContext(context?: T): void {
    this.context = context;
  }
}
