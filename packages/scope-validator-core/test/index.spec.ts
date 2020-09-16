import { ScopeValidatorManager, ScopeValidatorFactory } from '../lib';

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
  () => false
);

describe('success', () => {
  it('check parameter', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = scopeValidatorManager.validate(
      ['create:client:all', 'create:client:me', 'create:client:other'],
      {
        ownerId: 'asdf',
      }
    );

    expect(result).toEqual([true, true, false]);
  });
});

describe('failed', () => {
  it('not match ownerId', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = scopeValidatorManager.validate(
      ['create:client:all', 'create:client:me', 'create:client:other'],
      {
        ownerId: 'ss',
      }
    );

    expect(result).toEqual([true, false, false]);
  });

  it('multiple validator', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.use(TestValidator2);

    const result = scopeValidatorManager.validate(
      ['create:client:all', 'create:client:me', 'create:client:other'],
      {
        ownerId: 'asdf',
      }
    );

    expect(result).toEqual([false, true, false]);
  });
});
