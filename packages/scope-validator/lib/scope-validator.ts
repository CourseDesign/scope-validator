import ScopeValidatorContext from './scope-validator-context';
import Pattern from './pattern';

export default abstract class ScopeValidator<T> {
  pattern: Pattern;

  protected constructor(pattern: string | Pattern) {
    if (pattern instanceof Pattern) this.pattern = pattern;
    else this.pattern = new Pattern(pattern);
  }

  canValidate(str: string): boolean {
    return this.pattern.test(str);
  }

  abstract validate(name: string, context: ScopeValidatorContext<T>): boolean;
}
