export class Shape {
  name: string;

  regex: RegExp;

  constructor(name: string, regex = /[^a-z0-9-]+/g) {
    this.name = name;
    this.regex = regex;
  }
}

export default {
  Shape,
};
