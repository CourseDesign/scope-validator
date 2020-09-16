// eslint-disable-next-line max-classes-per-file
import ScopeValidator from './scope-validator';
import ScopeValidatorContext from './scope-validator-context';

type ScopeValidatorFunction<T> = (
  name: string,
  context: ScopeValidatorContext<T>
) => boolean;

export default class ScopeValidatorFactory<T> {
  static create<T = Record<string, unknown>>(
    pattern: string,
    func: ScopeValidatorFunction<T>
  ): ScopeValidator<T> {
    const CustomScopeValidator = class extends ScopeValidator<T> {
      constructor() {
        super(pattern);
      }

      // eslint-disable-next-line class-methods-use-this
      validate(name: string, context: ScopeValidatorContext<T>) {
        return func(name, context);
      }
    };

    return new CustomScopeValidator();
  }
}
