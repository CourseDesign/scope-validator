// eslint-disable-next-line max-classes-per-file
import ScopeValidator from './scope-validator';
import ScopeValidatorContext from './scope-validator-context';

type ScopeValidatorFunction = (
  name: string,
  context: ScopeValidatorContext
) => boolean;

export default class ScopeValidatorFactory {
  static create(func: ScopeValidatorFunction): ScopeValidator {
    const CustomScopeValidator = class extends ScopeValidator {
      // eslint-disable-next-line class-methods-use-this
      validate(name: string, context: ScopeValidatorContext) {
        return func(name, context);
      }
    };

    return new CustomScopeValidator();
  }
}
