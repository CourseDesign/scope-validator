import { ScopeValidatorManager } from '../lib/scope-validator-manager';
import { ScopeValidator } from '../lib/scope-validator';

describe('sucess', () => {
  const TestValidator = new (class extends ScopeValidator {
    // eslint-disable-next-line class-methods-use-this
    validate(name: string) {
      return true;
    }
  })();

  xit('validate', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator);
    scopeValidatorManager.context = {
      ownerId: 'asdf',
    };

    scopeValidatorManager.validate('create:client:all', 'create:client:me');
  });
});
