import { ScopeValidatorFactory, ScopeValidatorManager } from '../../lib';

const TestValidator1 = ScopeValidatorFactory.create(
  // eslint-disable-next-line no-template-curly-in-string
  'create:client:${restricter}',
  (name, { parameters, received }) => {
    const { restricter } = parameters ?? {};

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
  it('validate scope', () => {
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

  it('validate one scope', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.setContext({
      ownerId: 'asdf',
    });

    const result = scopeValidatorManager.validateOne('create:client:all');

    expect(result).toEqual(true);
  });

  it('validate many scope', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.setContext({
      ownerId: 'asdf',
    });

    const result = scopeValidatorManager.validateMany(
      'create:client:all',
      'create:client:me',
      'create:client:other'
    );

    expect(result).toEqual([true, true, false]);
  });

  it('no validator', () => {
    const scopeValidatorManager = new ScopeValidatorManager();

    const result = scopeValidatorManager.validate(
      ['create:client:all', 'create:client:me', 'create:client:other'],
      {
        ownerId: 'asdf',
      }
    );

    expect(result).toEqual([false, false, false]);
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
