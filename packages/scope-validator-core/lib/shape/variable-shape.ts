import { RequiredShape } from './required-shape';
import { Divider } from './divider';
import { ShapeValidator } from './validator/shape-validator';
import { VariableShapeValidator } from './validator/variable-shape-validator';

export class VariableShape extends RequiredShape {
  divider: Divider;

  constructor(name: string, divider: Divider, validator?: ShapeValidator) {
    const shapeValidator = validator ?? new VariableShapeValidator();
    super(name, shapeValidator);

    shapeValidator.init(this);

    this.divider = divider;
  }
}

export default {
  VariableShape,
};
