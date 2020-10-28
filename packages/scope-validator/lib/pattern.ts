export default class Pattern {
  str: string;

  get regex(): RegExp {
    const regex = this.str
      .replace(/(\${\w+})/g, '*')
      .replace(/[$^.+?]/g, '\\$&')
      .replace(/\*/g, `([!@#$%^&*\\-\\w]+)`);

    return new RegExp(`^${regex}$`);
  }

  constructor(str: string) {
    this.str = str;
  }

  test(compare: string): boolean {
    return this.regex.test(compare);
  }

  getParameters(compare: string): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    let parameterNames = this.str.split(/(?:\${|})/g);
    parameterNames = parameterNames.filter((value, index) => index % 2);

    if (parameterNames.length !== new Set(parameterNames).size) {
      throw new Error('Parameter name must be different');
    }

    const regexStr = this.str
      .replace(/(\${[!@#$%^&*\-\w]+})/g, '*')
      .replace(/[$^.+?]/g, '\\$&')
      .replace(/\*/g, '([!@#$%^&*\\-\\w]+)')
      .replace(/(\*)/g, ')(.+)(?:')
      .replace(/^(.*)/, '(?:$&')
      .replace(/(.*)$/, '$&)');

    const regex = new RegExp(`^${regexStr}$`);

    const parameterValues = compare.match(regex);
    parameterValues?.shift();

    parameterNames.forEach((name, index) => {
      result[name] = parameterValues?.[index];
    });

    return result;
  }
}
