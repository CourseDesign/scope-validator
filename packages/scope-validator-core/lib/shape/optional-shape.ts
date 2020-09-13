import { Shape } from './shape';
import { ShapeValidator } from './validator/shape-validator';
import { OptionalShapeValidator } from './validator/optional-shape-validator';

export class OptionalShape extends Shape {
  readonly defaultValue: string;

  constructor(name: string, defaultValue: string, validator?: ShapeValidator) {
    const shapeValidator = validator ?? new OptionalShapeValidator();
    super(name, shapeValidator);

    shapeValidator.init(this);

    this.defaultValue = defaultValue;
  }
}

export default {
  OptionalShape,
};
