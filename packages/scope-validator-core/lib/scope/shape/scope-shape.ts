import { Shape } from './shape';

export class ScopeShape {
  shapes: Shape[] = [];

  constructor(...shapes: Shape[]) {
    this.shapes = shapes;
  }
}

export default {
  ScopeShape,
};
