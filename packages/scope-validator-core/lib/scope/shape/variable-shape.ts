import { Shape } from './shape';
import { Divider } from './divider';

export class VariableShape extends Shape {
  private divider: Divider;

  constructor(name: string, divider: Divider) {
    super(name);

    this.divider = divider;
  }
}

export default {
  VariableShape,
};
