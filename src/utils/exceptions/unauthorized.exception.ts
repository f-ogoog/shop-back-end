import HttpException from "./http.exception";

export default class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super({ message, statusCode: 401, code: "UNAUTHORIZED" });
  }
}
