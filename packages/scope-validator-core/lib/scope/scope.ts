import { ScopeShape } from './shape';

export abstract class Scope<T extends ScopeShape> {
  private readonly scope: string;

  constructor(scope: string) {
    this.scope = scope;
  }
}

export default {
  Scope,
};
