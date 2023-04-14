export class CardRect {
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public getX() {
    return this.x;
  }

  public setX(x: number) {
    this.x = x;
  }

  public getY() {
    return this.y;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }
}
