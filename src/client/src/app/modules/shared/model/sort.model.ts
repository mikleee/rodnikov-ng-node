export class Sort {
  property?: string;
  direction: string = 'asc';


  constructor(property?: string, direction?: string) {
    this.property = property;
    this.direction = direction || 'asc';
  }
}
