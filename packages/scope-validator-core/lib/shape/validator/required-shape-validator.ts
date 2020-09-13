import { ShapeValidator } from './shape-validator';
import { ERROR, OK, Result } from '../../util';

export class RequiredShapeValidator extends ShapeValidator {
  validate(name?: string): Result<void> {
    if (!name || this.regex.test(name)) {
      return ERROR(`${name} is not valid shape`);
    }

    return OK();
  }
}

export default {
  RequiredShapeValidator,
};
