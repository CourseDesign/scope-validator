import { Divider, Shape } from '../shape';

type ScopeShapeOption = {
  divider: Divider;
};

export class ScopeShape {
  divider: Divider;

  shapes: Shape[] = [];

  constructor({ divider }: ScopeShapeOption, ...shapes: Shape[]) {
    this.divider = divider;
    this.shapes = shapes;
  }
}

export default {
  ScopeShape,
};
