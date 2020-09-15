export default class Pattern {
  str: string;

  get regex(): RegExp {
    const regex = this.str
      .replace(/(\${(.*)})/g, '*')
      .replace(/[$^.+?]/g, '\\$&')
      .replace(/(\*)/g, '(.+)');

    return new RegExp(regex);
  }

  constructor(str: string) {
    this.str = str;
  }

  test(compare: string): boolean {
    return this.regex.test(compare);
  }

  getParameters(compare: string): string[] {
    const result: string[] = [];

    compare.match(this.regex);

    return result;
  }

  getWildcard(compare: string): string[] {
    const result: string[] = [];

    this.str.match()?.forEach((match) => result.push(match));

    return result;
  }
}

/*

* 와일드카드
${param} 파라미터

 */
