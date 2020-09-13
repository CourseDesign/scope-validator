import { RequiredShape } from './required-shape';
import { Divider } from './divider';

export class VariableShape extends RequiredShape {
  divider: Divider;

  constructor(name: string, divider: Divider) {
    super(name);

    this.divider = divider;
  }
}

export default {
  VariableShape,
};
