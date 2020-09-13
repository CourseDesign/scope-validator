import { ScopeShape } from './scope-shape';
import { Scope } from './scope';

export class ScopeBuilder<T extends ScopeShape> {
  private ScopeShapeClass: { new (): T };

  constructor(ScopeShapeClass: { new (): T }) {
    this.ScopeShapeClass = ScopeShapeClass;
  }

  build(name: string) {
    return new Scope(this.ScopeShapeClass, name);
  }
}

export default {
  ScopeBuilder,
};

/*
const validator = new ScopeValidator(ScopeShape); // required . required : required
await validator.validate('string');



const builder = new ScopeBuilder<T>(); // Scope 실제로 Scope shape
const scope = builder.build(name); // required . required : required

get('resource')
get('subresource')
get('action')
*/
