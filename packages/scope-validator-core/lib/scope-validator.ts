import ScopeValidatorContext from './scope-validator-context';
import Pattern from './pattern';

type ScopeValidatorFunction = (
  name: string,
  context: ScopeValidatorContext
) => boolean;

export default abstract class ScopeValidator {
  static match(pattern: string, validator: ScopeValidatorFunction) {

  }

  // eslint-disable-next-line class-methods-use-this
  test(str: string): boolean {
    const pattern = new Pattern(str);

    return pattern.test(str);
  }

  abstract validate(name: string, context: ScopeValidatorContext): boolean;
}
