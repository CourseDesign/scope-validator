import { Shape } from './shape';

export class OptionalShape extends Shape {
  private readonly defaultValue: string;

  constructor(name: string, defaultValue: string) {
    super(name);

    this.defaultValue = defaultValue;
  }
}

export default {
  OptionalShape,
};
