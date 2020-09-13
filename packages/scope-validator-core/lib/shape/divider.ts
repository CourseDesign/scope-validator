type Name = (position: number) => string;

export class Divider {
  name: Name;

  constructor(name: Name | string) {
    if (typeof name === 'string') this.name = () => name;
    else this.name = name;
  }
}

export default {
  Divider,
};
