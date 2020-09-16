import { ScopeValidatorFactory, ScopeValidatorManager } from '../../lib';

const TestValidator1 = ScopeValidatorFactory.create(
  // eslint-disable-next-line no-template-curly-in-string
  '${action}:${resource}:${restricter}',
  (name, { parameters }) => {
    const { action, resource, restricter } = parameters ?? {};

    if (action === 'success') return true;
    if (action === 'test') {
      if (resource === 'restricter') {
        return restricter === 'success';
      }

      return true;
    }

    return false;
  }
);

const TestValidator2 = ScopeValidatorFactory.create(
  // eslint-disable-next-line no-template-curly-in-string
  '${action}:${resource}',
  (name, { parameters }) => {
    const { action, resource } = parameters ?? {};

    return action === resource;
  }
);

describe('success', () => {
  it('validate', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = scopeValidatorManager.validate([
      'success:anything:ok',
      'test:restricter:failed',
      'test:restricter:success',
      'failed:anything:test',
    ]);

    expect(result).toEqual([true, false, true, false]);
  });

  it('validate many validator', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);
    scopeValidatorManager.use(TestValidator2);

    const result = scopeValidatorManager.validate([
      'success:anything:ok',
      'test:restricter:failed',
      'test:restricter:success',
      'failed:anything:test',
      'test:test',
      'test:failed',
    ]);

    expect(result).toEqual([true, false, true, false, true, false]);
  });

  it('validate one', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = scopeValidatorManager.validateOne('success:anything:ok');

    expect(result).toEqual(true);
  });

  it('validate many', () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = scopeValidatorManager.validateMany(
      'success:anything:ok',
      'test:restricter:failed',
      'test:restricter:success',
      'failed:anything:test'
    );

    expect(result).toEqual([true, false, true, false]);
  });
});
