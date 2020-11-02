import ScopeValidatorContext from './scope-validator-context';
import Pattern from './pattern';

export default abstract class ScopeValidator<T> {
  private readonly pattern: Pattern;

  private optional = false;

  protected constructor(pattern: string | Pattern, optional = false) {
    if (pattern instanceof Pattern) this.pattern = pattern;
    else this.pattern = new Pattern(pattern);

    this.optional = optional;
  }

  canValidate(str: string): boolean {
    return this.pattern.test(str);
  }

  getPattern(): Pattern {
    return this.pattern;
  }

  isOptional(): boolean {
    return this.optional;
  }

  abstract validate(
    name: string,
    context: ScopeValidatorContext<T>
  ): boolean | Promise<boolean>;
}
