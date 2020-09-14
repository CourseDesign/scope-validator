// eslint-disable-next-line max-classes-per-file
import ScopeValidator from './scope-validator';

export default class ScopeValidatorFactory {
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/explicit-module-boundary-types
  create(func: (name: string) => boolean) {
    const CustomScopeValidator = class extends ScopeValidator {
      // eslint-disable-next-line class-methods-use-this
      validate(name: string) {
        return func(name);
      }
    };

    return new CustomScopeValidator();
  }
}
