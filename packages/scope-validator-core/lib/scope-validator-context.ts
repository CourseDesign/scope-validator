export default interface ScopeValidatorContext {
  parameters?: Record<string, unknown>;

  received?: Record<string, unknown>;
}
