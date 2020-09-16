export default interface ScopeValidatorContext<T> {
  parameters?: Record<string, unknown>;

  received?: T;
}
