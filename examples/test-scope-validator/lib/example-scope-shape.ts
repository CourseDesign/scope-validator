// eslint-disable-next-line max-classes-per-file
import {
  Divider,
  RequiredShape,
  Shape,
  VariableShape,
} from 'scope-validator-core/dist/scope/shape';

class ExampleScopeShape extends ScopeShape {
  constructor() {
    super([
      new RequiredShape('action'),
      new Divider(':'),
      new VariableShape('resource', new Divider('.')),
      new Divider(':'),
      new Shape('restricter'),
    ]);
  }
}
