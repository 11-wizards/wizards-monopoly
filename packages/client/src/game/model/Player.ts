export class Player {
  private readonly id: number;
  private readonly name: string;
  private readonly color: string;
  private currentCardId: number;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.currentCardId = 0;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public getCurrentCardId(): number {
    return this.currentCardId;
  }

  public setCurrentCardId(cardId: number) {
    this.currentCardId = cardId;
  }
}
