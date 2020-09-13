import {
  Divider,
  OptionalShape,
  RequiredShape,
  VariableShape,
} from 'scope-validator-core/dist/shape';
import { ScopeShape } from 'scope-validator-core/dist/scope';

export class ExampleScopeShape extends ScopeShape {
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
}

export default {
  ExampleScopeShape,
};
