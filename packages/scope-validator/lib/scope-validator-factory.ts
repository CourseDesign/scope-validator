// eslint-disable-next-line max-classes-per-file
import ScopeValidator from './scope-validator';
import ScopeValidatorContext from './scope-validator-context';

type ScopeValidatorFunction<T> = (
  name: string,
  context: ScopeValidatorContext<T>
) => boolean;

type ScopeValidatorAsyncFunction<T> = (
  name: string,
  context: ScopeValidatorContext<T>
) => Promise<boolean>;

type ScopeValidatorOption = {
  optional?: boolean;
};

export default class ScopeValidatorFactory<T> {
  static create<T = Record<string, unknown>>(
    pattern: string,
    func: ScopeValidatorFunction<T>,
    options?: ScopeValidatorOption
  ): ScopeValidator<T> {
    const CustomScopeValidator = class extends ScopeValidator<T> {
      private readonly func;

      constructor() {
        super(pattern, options?.optional ?? false);

        this.func = func;
      }

      validate(name: string, context: ScopeValidatorContext<T>): boolean {
        return this.func(name, context);
      }
    };

    return new CustomScopeValidator();
  }

  static createAsync<T = Record<string, unknown>>(
    pattern: string,
    func: ScopeValidatorAsyncFunction<T>,
    options?: ScopeValidatorOption
  ): ScopeValidator<T> {
    const CustomScopeValidator = class extends ScopeValidator<T> {
      private readonly func;

      constructor() {
        super(pattern, options?.optional ?? false);

        this.func = func;
      }

      async validate(
        name: string,
        context: ScopeValidatorContext<T>
      ): Promise<boolean> {
        return this.func(name, context);
      }
    };

    return new CustomScopeValidator();
  }
}
