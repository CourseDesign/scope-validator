import { ScopeBuilder } from 'scope-validator-core/dist/scope';
import { ExampleScopeShape } from './example-scope-shape';

(async () => {
  const builder = new ScopeBuilder(ExampleScopeShape);
  const scope = builder.build('create:test.a.b:all');

  scope.validate();
})();
