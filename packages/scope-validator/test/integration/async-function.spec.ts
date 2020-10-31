import { ScopeValidatorFactory, ScopeValidatorManager } from '../../lib';

const TestValidator1 = ScopeValidatorFactory.createAsync(
  // eslint-disable-next-line no-template-curly-in-string
  '${param1}-${param2}',
  async (name, { parameters }) => {
    const { param1, param2 } = parameters ?? {};

    return new Promise((resolve) => {
      if (param1 === param2) resolve(true);
      else resolve(false);
    });
  }
);

describe('success', () => {
  it('validate', async () => {
    const scopeValidatorManager = new ScopeValidatorManager();
    scopeValidatorManager.use(TestValidator1);

    const result = await scopeValidatorManager.validateAsync([
      'test-test',
      'test-test2',
      'test-test-test',
    ]);

    expect(result).toEqual([true, false, false]);
  });
});
