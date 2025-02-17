import HttpException from "./http.exception";

export default class BadRequestException extends HttpException {
  constructor(message: string) {
    super({ message, statusCode: 400, code: "BAD_REQUEST" });
  }
}
