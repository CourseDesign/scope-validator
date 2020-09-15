import ScopeValidatorManager from '../lib/scope-validator-manager';
import ScopeValidatorFactory from '../lib/scope-validator-factory';
import ScopeValidator from '../lib/scope-validator';

describe('success', () => {
  const TestValidator = ScopeValidatorFactory.create(
    // eslint-disable-next-line no-template-curly-in-string
    'create:client:${restricter}',
    (name, { parameters, received }) => {
      console.log(name, parameters, received);
      const { restricter } = parameters ?? { restricter: null };

      if (restricter === 'all') return true;
      if (restricter === 'me') return received?.ownerId === 'asdf';
      return false;
    }
  );

  it('validate', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator);
    scopeValidatorManager.context = {
      ownerId: 'asdf',
    };

    const result = scopeValidatorManager.validate(
      'create:client:all',
      'create:client:me',
      'create:client:other'
    );

    expect(result).toEqual([true, true, false]);
  });
});
