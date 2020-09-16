import ScopeValidator from './scope-validator';

export default class ScopeValidatorManager {
  private readonly scopeValidators: ScopeValidator[] = [];

  private context: Record<string, unknown> = {};

  constructor(...scopeValidators: ScopeValidator[]) {
    this.use(...scopeValidators);
  }

  use(...scopeValidators: ScopeValidator[]): void {
    this.scopeValidators.push(...scopeValidators);
  }

  validateOne(scope: string): boolean {
    return this.scopeValidators
      .filter((validator) => validator.test(scope))
      .every((validator) =>
        validator.validate(scope, {
          received: this.context,
          parameters: validator.pattern.getParameters(scope),
        })
      );
  }

  validateMany(...scopes: string[]): boolean[] {
    return scopes.map((scope) => this.validateOne(scope));
  }

  validate(scope: string[], context: Record<string, unknown>): boolean[] {
    this.context = context;
    return this.validateMany(...scope);
  }

  setContext(context: Record<string, unknown>): void {
    this.context = context;
  }
}
