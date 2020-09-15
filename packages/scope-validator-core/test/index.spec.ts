import ScopeValidatorManager from '../lib/scope-validator-manager';
import ScopeValidatorFactory from '../lib/scope-validator-factory';
import ScopeValidator from '../lib/scope-validator';

const TestValidator1 = ScopeValidatorFactory.create(
  // eslint-disable-next-line no-template-curly-in-string
  'create:client:${restricter}',
  (name, { parameters, received }) => {
    const { restricter } = parameters ?? { restricter: null };

    if (restricter === 'all') return true;
    if (restricter === 'me') return received?.ownerId === 'asdf';
    return false;
  }
);

const TestValidator2 = ScopeValidatorFactory.create(
  'create:client:all',
  (name, { parameters, received }) => {
    return false;
  }
);

describe('success', () => {
  it('check parameter', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
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

describe('failed', () => {
  it('not match ownerId', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.context = {
      ownerId: 'ss',
    };

    const result = scopeValidatorManager.validate(
      'create:client:all',
      'create:client:me',
      'create:client:other'
    );

    expect(result).toEqual([true, false, false]);
  });

  it('multiple validator', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.use(TestValidator2);
    scopeValidatorManager.context = {
      ownerId: 'asdf',
    };

    const result = scopeValidatorManager.validate(
      'create:client:all',
      'create:client:me',
      'create:client:other'
    );

    expect(result).toEqual([false, true, false]);
  });
});
