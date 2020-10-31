export default interface ScopeValidatorContext<T> {
  parameters?: Record<string, string>;

  received?: T;
}
