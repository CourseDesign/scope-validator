import { ShapeValidator } from './shape-validator';
import { ERROR, linearSplit, OK, Result } from '../../util';
import { VariableShape } from '../variable-shape';

export class VariableShapeValidator extends ShapeValidator {
  validate(name?: string): Result<void> {
    if (!name) return ERROR(`${name} is not valid shape`);

    const { divider } = this.shape as VariableShape;
    const names = linearSplit(name, divider.name);

    const results: Result<void>[] = names.map(
      (str): Result<void> => {
        if (this.regex.test(str)) {
          return ERROR(`${name} is not valid shape`);
        }

        return OK();
      }
    );

    for (const result of results) {
      if (!result.ok) return result;
    }

    return OK();
  }
}

export default {
  VariableShapeValidator,
};
