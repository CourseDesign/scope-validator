import { Shape } from './shape';
import { ShapeValidator } from './validator/shape-validator';
import { RequiredShapeValidator } from './validator/required-shape-validator';

export class RequiredShape extends Shape {
  constructor(name: string, validator?: ShapeValidator) {
    const shapeValidator = validator ?? new RequiredShapeValidator();
    super(name, shapeValidator);

    shapeValidator.init(this);
  }
}

export default {
  RequiredShape,
};
