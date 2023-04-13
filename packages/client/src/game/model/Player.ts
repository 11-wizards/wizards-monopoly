import type { Property } from './Property';

export class Player {
  private readonly id: string;
  private readonly name: string;
  private readonly color: string;
  private x: number;
  private y: number;
  private amount: number;
  private property: Property[];

  constructor(id: string, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.amount = 15_000_000;
    this.property = [];
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public getX(): number {
    return this.x;
  }

  public setX(x: number) {
    this.x = x;
  }

  public getY(): number {
    return this.y;
  }

  public setY(y: number) {
    this.y = y;
  }

  public getAmount(): number {
    return this.amount;
  }

  public sellProperty(propertyId: string, amount: number): Nullable<Property> {
    const found = this.property.find((property) => property.getId() === propertyId);
    if (found === undefined) {
      return null;
    }
    this.amount += amount;

    return found;
  }

  public buyProperty(property: Property): Nullable<number> {
    if (this.amount >= property.getPrice()) {
      this.amount -= property.getPrice();
      this.property.push(property);

      return property.getPrice();
    }

    return null;
  }

  public pay(amount: number): boolean {
    this.amount -= amount;
    if (this.amount < 0) {
      this.amount = 0;

      return false;
    }

    return true;
  }

  public chargeFee(amount: number) {
    this.amount += amount;
  }
}
