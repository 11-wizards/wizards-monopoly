export type TypeErrorApi = {
  statusCode: number,
  message: string
}

export class ErrorApi extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
