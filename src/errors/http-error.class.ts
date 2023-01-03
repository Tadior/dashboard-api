export class HTTPError extends Error {
  statusCode: number;
  context?: string;
  constructor(statusCose: number, message: string, context?: string) {
    super(message);
    this.statusCode = statusCose;
    this.message = message;
    this.context = context;
  }
}
