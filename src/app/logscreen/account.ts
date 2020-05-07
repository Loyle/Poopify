export class Account {
  name: string;
  email: string;
  bdate: date;
  pass: string;
  country: string;

  constructor(obj?: any) {
    this.name   = obj && obj.name           || null;
    this.email  = obj && obj.email        || null;
    this.bdate  = obj && obj.bdate  || null;
    this.pass   = obj && obj.pass || null;
    this.country= obj && obj.country     || null;
  }
}
