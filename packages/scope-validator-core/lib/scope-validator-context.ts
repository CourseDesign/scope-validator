export default interface ScopeValidatorContext {
  parameters?: string[];

  received?: Record<string, unknown>;
}
