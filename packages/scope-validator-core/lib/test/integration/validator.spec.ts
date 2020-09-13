// eslint-disable-next-line max-classes-per-file
import { ScopeBuilder, ScopeShape } from '../../scope';
import {
  Divider,
  OptionalShape,
  RequiredShape,
  VariableShape,
} from '../../shape';
import { RequiredShapeValidator } from '../../shape/validator/required-shape-validator';

describe('scope validator core', () => {
  const TestShape1 = class extends ScopeShape {
    constructor() {
      super(
        {
          divider: new Divider(':'),
        },
        new RequiredShape('action'),
        new VariableShape('resource', new Divider('.')),
        new OptionalShape('restricter', 'self')
      );
    }
  };

  let TestShape2: any;

  beforeAll(() => {
    const customShapeValidator = new RequiredShapeValidator();
    customShapeValidator.regex = /[^a-z]+/g;

    TestShape2 = class extends ScopeShape {
      constructor() {
        super(
          {
            divider: new Divider((position) => {
              if (position <= 1) return '/';

              return ':';
            }),
          },
          new RequiredShape('action'),
          new VariableShape(
            'resource',
            new Divider((position) => {
              if (position <= 1) return '.';

              return ';';
            })
          ),
          new RequiredShape('test1', customShapeValidator),
          new OptionalShape('test2', 'test'),
          new OptionalShape('test3', 'test')
        );
      }
    };
  });

  it('success: validate scope shape with exist optional', () => {
    const builder = new ScopeBuilder(TestShape1);
    const scope = builder.build('create:client.name:all');

    const result = scope.validate();

    expect(result.ok).toBe(true);
  });

  it('failed: validate scope shape with exist optional', () => {
    const builder = new ScopeBuilder(TestShape1);
    const scope = builder.build('create:client.invalid|divider:all');

    const result = scope.validate();

    expect(!!result.error).toBe(true);
  });

  it('success: validate scope shape without exist optional', () => {
    const builder = new ScopeBuilder(TestShape1);
    const scope = builder.build('create:client.name');

    const result = scope.validate();

    expect(result.ok).toBe(true);
  });

  it('failed: validate scope shape without exist optional', () => {
    const builder = new ScopeBuilder(TestShape1);
    const scope = builder.build('create:client.invalid|divider');

    const result = scope.validate();

    expect(!!result.error).toBe(true);
  });

  it('success: validate complex scope', () => {
    const builder = new ScopeBuilder(TestShape2);
    const scope = builder.build(
      'create/test1.test2.test3;test4;test5/name:asdf:ggwgs'
    );

    const result = scope.validate();

    expect(result.ok).toBe(true);
  });

  it('success: validate complex scope / two optional', () => {
    const builder = new ScopeBuilder(TestShape2);
    const scope = builder.build('create/test1.test2.test3;test4;test5/name');

    const result = scope.validate();

    expect(result.ok).toBe(true);
  });

  it('failed: validate complex scope / regex', () => {
    const builder = new ScopeBuilder(TestShape2);
    const scope = builder.build(
      'create/test1.test2.test3;test4;test5/Name:asdf:ggwgs'
    );

    const result = scope.validate();

    expect(!!result.error).toBe(true);
  });

  it('failed: validate complex scope / divider 1', () => {
    const builder = new ScopeBuilder(TestShape2);
    const scope = builder.build(
      'create/test1.test2.test3;test4;test5/name/asdf:ggwgs'
    );

    const result = scope.validate();

    expect(!!result.error).toBe(true);
  });

  it('failed: validate complex scope / divider 2', () => {
    const builder = new ScopeBuilder(TestShape2);
    const scope = builder.build(
      'create/test1.test2;test3;test4;test5/name:asdf:ggwgs'
    );

    const result = scope.validate();

    expect(!!result.error).toBe(true);
  });
});
