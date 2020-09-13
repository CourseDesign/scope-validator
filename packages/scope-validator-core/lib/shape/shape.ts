import { ShapeValidator } from './validator/shape-validator';

export class Shape {
  name: string;

  validator: ShapeValidator;

  constructor(name: string, validator: ShapeValidator) {
    this.name = name;
    this.validator = validator;
  }
}

export default {
  Shape,
};
