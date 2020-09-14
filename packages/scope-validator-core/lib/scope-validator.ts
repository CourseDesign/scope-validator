import ScopeValidatorContext from './scope-validator-context';

export default abstract class ScopeValidator {
  static match(pattern: string, validator: ScopeValidator) {}

  // eslint-disable-next-line class-methods-use-this
  match(pattern: string): boolean {
    return true;
  }

  abstract validate(name: string, context: ScopeValidatorContext): boolean;
}
