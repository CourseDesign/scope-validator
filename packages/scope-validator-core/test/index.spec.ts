import ScopeValidatorManager from '../lib/scope-validator-manager';
import ScopeValidatorFactory from '../lib/scope-validator-factory';

describe('success', () => {
  const TestValidator = ScopeValidatorFactory.create(() => false);

  xit('validate', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator);
    scopeValidatorManager.context = {
      ownerId: 'asdf',
    };

    scopeValidatorManager.validate('create:client:all', 'create:client:me');
  });
});
