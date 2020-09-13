import { Result } from '../../util';
import { Shape } from '../shape';

export abstract class ShapeValidator {
  regex: RegExp;

  shape?: Shape;

  constructor(shape?: Shape, regex = /[^a-z0-9-]+/g) {
    this.shape = shape;
    this.regex = regex;
  }

  init(shape: Shape): void {
    this.shape = shape;
  }

  abstract validate(name?: string): Result<void>;
}

export default {
  ShapeValidator,
};
