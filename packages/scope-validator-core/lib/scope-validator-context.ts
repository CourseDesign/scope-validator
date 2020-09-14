export interface ScopeValidatorContext {
  parameters?: string[];

  received?: Record<string, unknown>;
}

export default ScopeValidatorContext;
