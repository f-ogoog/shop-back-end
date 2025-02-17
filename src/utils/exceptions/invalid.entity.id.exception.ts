import BadRequestException from "./bad.request.exception";

export class InvalidEntityIdExceprion extends BadRequestException {
  constructor(entityName: string) {
    super(`${entityName} with such id is not found`);
  }
}
