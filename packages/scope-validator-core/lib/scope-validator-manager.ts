import ScopeValidator from './scope-validator';

export default class ScopeValidatorManager {
  scopeValidators: ScopeValidator[] = [];

  context: Record<string, unknown> = {};

  constructor(...scopeValidators: ScopeValidator[]) {
    this.use(...scopeValidators);
  }

  use(...scopeValidators: ScopeValidator[]) {
    this.scopeValidators.push(...scopeValidators);
  }

  validateOne(scope: string): boolean {
    return this.scopeValidators
      .filter((validator) => validator.match(scope))
      .every((validator) => validator.validate(scope, this.context));
  }

  validate(...scopes: string[]): boolean[] {
    return scopes.map((scope) => this.validateOne(scope));
  }
}
